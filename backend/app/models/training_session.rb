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

  validates :session_date, presence: true
  validates :duration_seconds, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true

  def duration
    return nil unless duration_seconds

    hours, remainder = duration_seconds.divmod(3600)
    minutes, seconds = remainder.divmod(60)

    if hours > 0
      format("%d:%02d:%02d", hours, minutes, seconds)
    elsif minutes > 0
      format("%d:%02d", minutes, seconds)
    else
      format("%d", seconds)
    end
  end
end
