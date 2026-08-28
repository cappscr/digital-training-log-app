class TrainingSession < ApplicationRecord
  belongs_to :user
  has_one :training_session_weather, dependent: :destroy
  delegated_type :sport_details, types: %w[
    RunningTrainingSession
    CrossTrainingSession
    StrengthTrainingSession
    SupplementaryTrainingSession
  ], dependent: :destroy

  enum :location_type, { outdoor: "outdoor", indoor: "indoor" }

  validates :duration_seconds, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
end
