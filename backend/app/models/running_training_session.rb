class RunningTrainingSession < ApplicationRecord
  include TrainingSessionable
  include DurationOrDistanceValidatable

  has_many :running_training_session_tags, dependent: :destroy
  has_many :running_training_session_types, dependent: :destroy

  validates :distance, numericality: { greater_than: 0 }, allow_nil: true
  validates :elevation_gain, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :average_cadence, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :average_heart_rate, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
end
