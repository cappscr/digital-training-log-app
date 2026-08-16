class RunningTrainingSessionTag < ApplicationRecord
  belongs_to :running_training_session

  enum :kind, { strides: "strides", treadmill: "treadmill", run_club: "run_club",
                cross_training: "cross_training" }
end
