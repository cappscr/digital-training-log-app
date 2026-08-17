class StrengthTrainingSession < ApplicationRecord
  include TrainingSessionable

  has_many :exercises,
           class_name: "StrengthTrainingExercise",
           inverse_of: :session,
           dependent: :destroy
end
