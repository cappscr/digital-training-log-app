class RunningTrainingSessionType < ApplicationRecord
  belongs_to :running_training_session

  enum :kind, { workout: "workout", race: "race", long_run: "long_run" }
end
