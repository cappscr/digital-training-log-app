class TrainingSession < ApplicationRecord
  belongs_to :user
  delegated_type :sport_session, types: %w[
    RunningTrainingSession
    CrossTrainingSession
    StrengthTrainingSession
    SupplementaryTrainingSession
  ]
  
  enum :location_type, { outdoor: "outdoor", indoor: "indoor" }
end
