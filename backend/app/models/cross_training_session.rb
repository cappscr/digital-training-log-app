class CrossTrainingSession < ApplicationRecord
  include TrainingSessionable
  include DistanceValidatable
  include DurationOrDistanceValidatable
  include ElevationGainValidatable

  normalizes :activity, with: ->(value) { value&.strip }

  validates :activity, presence: true, length: { maximum: 100 }
  validates :average_heart_rate, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
end
