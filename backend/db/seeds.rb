# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'csv'

return unless Rails.env.development?

SEED_NAMESPACE = "f47ac10b-58cc-4372-a567-0e02b2c3d479"

def seed_id(label, import_id)
  Digest::UUID.uuid_v5(SEED_NAMESPACE, "#{label}:#{import_id}")
end

csv_path = Rails.root.join('db', 'seeds', 'training_sessions.csv')

user = User.find_or_create_by(email: 'capps.christopher@gmail.com') do |user|
  user.name = "Chris Capps"
  user.password = "Passw0rd!" # dev-only
end

CSV.foreach(csv_path, headers: true) do |row|
  training_id = seed_id("training_session", row["id"])

  if row["sport"]&.strip == "running"
    running_id = seed_id("running_training_session", row["id"])
    sport_details = RunningTrainingSession.find_or_initialize_by(id: running_id)
    sport_details.assign_attributes(
      distance: row["distance"].presence&.to_d,
      distance_unit: row["distance_unit"].presence&.strip,
      elevation_gain: row["elevation_gain"].presence&.to_i,
      # add elevation unit here
      average_heart_rate: row["average_heart_rate"].presence&.to_i,
      average_cadence: row["average_cadence"].presence&.to_i,
      # in the future add tags and running session types
    )
  elsif row["sport"]&.strip == "cross_training"
    cross_training_id = seed_id("cross_training_session", row["id"])
    sport_details = CrossTrainingSession.find_or_initialize_by(id: cross_training_id)
    sport_details.assign_attributes(
      activity: row["activity"].presence&.strip || "Uphill Treadmill",
      distance: row["distance"].presence&.to_d,
      distance_unit: row["distance_unit"].presence&.strip,
      elevation_gain: row["elevation_gain"].presence&.to_i,
      elevation_unit: row["elevation_unit"].presence&.strip || "ft",
      average_heart_rate: row["average_heart_rate"].presence&.to_i,
    )
  else
    # skip any other sports
    next
  end

  session = TrainingSession.find_or_initialize_by(id: training_id)
  session.assign_attributes(
    # in the future add weather details
    user: user,
    duration_seconds: row["duration_seconds"].presence&.to_i,
    notes: row["notes"].presence&.strip,
    session_date: Date.iso8601(row["session_date"]),
    session_time: row["session_time"].presence&.strip,
    location_type: row["location"].presence&.strip,
    sport_details: sport_details
  )
  session.save!
end
