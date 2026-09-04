class TrainingSessionSerializer < ActiveModel::Serializer
  attributes :id, :duration, :day_of_week, :location_type, :notes, :session_date, :session_time, :sport_details_type, :user_id, :created_at, :updated_at

  attribute :sport_details

  def day_of_week
    return nil unless object.session_date

    object.session_date.strftime("%A")
  end

  def session_time
    return nil unless object.session_time

    object.session_time.strftime("%H:%M")
  end

  def sport_details
    details = object.sport_details
    return nil unless details

    serializer = "#{details.class.name}Serializer".constantize
    serializer.new(details).as_json
  end
end
