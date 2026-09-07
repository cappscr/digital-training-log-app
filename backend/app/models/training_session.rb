class TrainingSession < ApplicationRecord
  belongs_to :user
  has_one :training_session_weather, dependent: :destroy
  delegated_type :sport_details, types: %w[
    RunningTrainingSession
    CrossTrainingSession
    StrengthTrainingSession
    SupplementaryTrainingSession
  ], dependent: :destroy, inverse_of: :training_session

  enum :location_type, { outdoor: "outdoor", indoor: "indoor" }

  validate :sport_details_must_be_valid
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

  private

  def sport_details_must_be_valid
    return if sport_details.blank?
    return if sport_details.valid?

    sport_details.errors.each do |error|
      attribute =
        if error.attribute == :base
          :sport_details
        else
          :"sport_details/#{error.attribute}"
        end

      errors.add(attribute, error.message)
    end
  end
end
