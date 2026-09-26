class RunningTrainingSessionSerializer < ActiveModel::Serializer
  attributes :id, :distance, :distance_unit, :elevation_gain, :elevation_unit, :average_heart_rate, :average_cadence, :created_at, :updated_at

  def distance
    object.distance&.to_f
  end
end
