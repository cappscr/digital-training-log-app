class RunningTrainingSession < ApplicationRecord
  include TrainingSessionable

  has_many :running_training_session_tags, dependent: :destroy
  has_many :running_training_session_types, dependent: :destroy
end
