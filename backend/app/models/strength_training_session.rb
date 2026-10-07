class StrengthTrainingSession < ApplicationRecord
  include TrainingSessionable

  has_many :exercises, -> { order(:position)},
           class_name: "StrengthTrainingExercise",
           inverse_of: :session,
           dependent: :destroy,
           autosave: true

  validates :average_heart_rate, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
  validate :exercises_must_be_valid

  # Returns the volume load of the session.
  def volume_load
    return nil unless exercises_all_in_same_units?

    exercises.sum do |exercise|
      exercise.sets * exercise.reps * (exercise.weight || 0)
    end
  end

  # Returns the units of the volume load.
  def volume_load_units
    return nil unless exercises_all_in_same_units?
    exercises_weight_units = exercises.filter_map(&:weight_units)
    exercises_weight_units.first
  end

  # Syncs the exercises with the session.
  def sync_exercises(exercise_params)
    incoming = Array(exercise_params)
    keep_ids = []

    incoming.each_with_index do |params, index|
      attrs = params.to_h.symbolize_keys.except(:strength_training_session_id)
      attrs[:position] = index + 1 if attrs[:position].blank?

      exercise =
        if attrs[:id].present?
          exercises.find(attrs[:id])
        else
          exercises.build(attrs)
        end

      exercise.assign_attributes(attrs)
      exercise.session = self
      keep_ids << exercise.id
    end
  
    exercises.each do |exercise|
      next if keep_ids.include?(exercise.id)
      exercise.mark_for_destruction
    end
  end

  private
  # Validates that all exercises are valid.
  def exercises_must_be_valid
    exercises.each_with_index do |exercise, index|
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
    exercises_weight_units = exercises.filter_map(&:weight_units)
    exercises_weight_units.any? && exercises_weight_units.uniq.length == 1
  end
end
