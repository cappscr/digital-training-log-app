class StrengthTrainingSession < ApplicationRecord
  include TrainingSessionable

  has_many :exercises, -> { order(:position) },
           class_name: "StrengthTrainingExercise",
           inverse_of: :session,
           dependent: :destroy,
           autosave: true

  validates :average_heart_rate, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
  validate :exercises_must_be_valid
  validate :at_least_one_exercise
  validate :no_exercises_in_same_position

  # Returns the volume load of the session.
  def volume_load
    return nil unless exercises_all_in_same_units?

    exercises.sum do |exercise|
      exercise.sets * exercise.reps * (exercise.weight || 0)
    end
  end

  # Returns the units of the volume load.
  def volume_load_unit
    return nil unless exercises_all_in_same_units?
    exercises_weight_unit = exercises.filter_map(&:weight_unit)
    exercises_weight_unit.first
  end

  # Syncs the exercises with the session.
  def sync_exercises(exercise_params)
    exercises.load
    incoming = Array(exercise_params)
    keep_ids = []

    incoming.each_with_index do |params, index|
      attrs = params.to_h.symbolize_keys.except(:strength_training_session_id, :id)
      attrs[:position] = index + 1 if attrs[:position].blank?

      incoming_id = params.to_h.symbolize_keys[:id].presence
      exercise = exercises.target.find { |existing| existing.id == incoming_id } if incoming_id
      exercise ||= exercises.build(id: incoming_id)

      exercise.assign_attributes(attrs)
      exercise.session = self
      keep_ids << exercise.id
    end

    exercises.target.each do |exercise|
      next if keep_ids.include?(exercise.id)
      exercise.mark_for_destruction
    end
  end

  private
  # Returns the active exercises.
  def active_exercises
    exercises.target.reject(&:marked_for_destruction?)
  end

  # Validates that there is at least one exercise.
  def at_least_one_exercise
    return if active_exercises.length > 0

    errors.add(:exercises, "must have at least one exercise")
  end

  # Validates that there are no exercises in the same position.
  def no_exercises_in_same_position
    return if active_exercises.map(&:position).uniq.size == active_exercises.size

    errors.add(:exercises, "must have unique positions")
  end

  # Validates that all exercises are valid.
  def exercises_must_be_valid
    active_exercises.each_with_index do |exercise, index|
      next if exercise.valid?

      exercise.errors.each do |error|
        attribute =
          if error.attribute == :base
            :"exercises/#{index}"
          else
            :"exercises/#{index}/#{error.attribute}"
          end

        errors.add(attribute, error.message)
      end
    end
  end

  # Returns true if all non-bodyweight exercises have the same weight units.
  def exercises_all_in_same_units?
    exercises_weight_unit = active_exercises.filter_map(&:weight_unit)
    exercises_weight_unit.any? && exercises_weight_unit.uniq.length == 1
  end
end
