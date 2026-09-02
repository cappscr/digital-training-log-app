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
  # temporarily skip cross_training sessions until the models are ready
  next if row["session_type"]&.strip == "cross_training"

  training_id = seed_id("training_session", row["id"])
  running_id = seed_id("running_training_session", row["id"])

  running = RunningTrainingSession.find_or_initialize_by(id: running_id)
  running.assign_attributes(
    distance: row["distance"].presence&.to_d,
    elevation_gain: row["elevation_gain"].presence&.to_i,
    average_heart_rate: row["average_heart_rate"].presence&.to_i,
    average_cadence: row["average_cadence"].presence&.to_i,
    # in the future add tags and running session types
  )

  session = TrainingSession.find_or_initialize_by(id: training_id)
  session.assign_attributes(
    # in the future add weather details
    user: user,
    duration_seconds: row["duration_seconds"].presence&.to_i,
    notes: row["notes"].presence&.strip,
    session_date: Date.iso8601(row["session_date"]),
    location_type: row["tags"]&.strip&.include?("treadmill") ? "indoor" : "outdoor",
    sport_details: running
  )
  session.save!
end
