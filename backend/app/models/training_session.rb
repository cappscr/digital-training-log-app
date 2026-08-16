class TrainingSession < ApplicationRecord
  belongs_to :user
  delegated_type :sport_details, types: %w[
    RunningTrainingSession
    CrossTrainingSession
    StrengthTrainingSession
    SupplementaryTrainingSession
  ], dependent: :destroy

  enum :location_type, { outdoor: "outdoor", indoor: "indoor" }
end
