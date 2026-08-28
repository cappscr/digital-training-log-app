module DurationOrDistanceValidatable
  extend ActiveSupport::Concern

  included do
    validate :duration_or_distance_present
  end

  private

  def duration_or_distance_present
    duration = training_session&.duration_seconds
    return if duration.present? || distance.present?

    errors.add(:base, "Duration or distance can't be blank")
  end
end