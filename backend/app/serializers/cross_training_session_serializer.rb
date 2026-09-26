class CrossTrainingSessionSerializer < ActiveModel::Serializer
  attributes :id, :activity, :distance, :distance_unit, :elevation_gain, :elevation_unit, :average_heart_rate, :created_at, :updated_at

  def distance
    object.distance&.to_f
  end
end
