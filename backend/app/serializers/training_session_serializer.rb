class TrainingSessionSerializer < ActiveModel::Serializer
  attributes :id, :duration, :location_type, :notes, :session_date, :session_time, :sport_details_type, :user_id, :created_at, :updated_at

  attribute :sport_details

  def sport_details
    details = object.sport_details
    return nil unless details

    serializer = "#{details.class.name}Serializer".constantize
    serializer.new(details).as_json
  end
end
