class RunningTrainingSessionSerializer < ActiveModel::Serializer
  attributes :id, :distance, :elevation_gain, :average_heart_rate, :average_cadence, :created_at, :updated_at
end