class StrengthTrainingExercise < ApplicationRecord
  belongs_to :session,
             class_name: "StrengthTrainingSession",
             foreign_key: :strength_training_session_id,
             inverse_of: :exercises

  enum :weight_units, {
    lbs: "lbs",
    kg: "kg"
  }, prefix: :weight_in
end
