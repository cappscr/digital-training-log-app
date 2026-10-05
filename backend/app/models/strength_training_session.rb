class StrengthTrainingSession < ApplicationRecord
  include TrainingSessionable

  has_many :exercises, -> { order(:position)},
           class_name: "StrengthTrainingExercise",
           inverse_of: :session,
           dependent: :destroy,
           autosave: true

  validates :average_heart_rate, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
  validate :exercises_must_be_valid

  private
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
end
