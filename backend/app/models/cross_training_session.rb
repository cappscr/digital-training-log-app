class CrossTrainingSession < ApplicationRecord
  include TrainingSessionable
  include DistanceValidatable
  include DurationOrDistanceValidatable

  normalizes :activity, with: ->(value) { value&.strip }

  # Move to concern in #410
  enum :elevation_unit, { ft: "ft", m: "m" }, validate: { allow_nil: true }
  validates :elevation_gain, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :elevation_unit, presence: true, if: -> { elevation_gain.present? }

  validates :activity, presence: true, length: { maximum: 100 }
  validates :average_heart_rate, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
end
