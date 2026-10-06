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
