require 'rails_helper'

RSpec.describe "Strength Training Sessions", type: :request do
  # create strength training session
  describe "POST /api/v1/training_sessions" do
    let(:user) { create(:user, :activated) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with valid parameters" do
        it "creates a new strength training session" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 1800,
              location_type: "indoor",
              notes: "This is a test strength training session",
              sport_details: {
                kind: "strength_training",
                average_heart_rate: 120,
                exercises: [
                  {
                    name: "Bench Press",
                    sets: 3,
                    reps: 10,
                    weight: 100,
                    weight_unit: "lbs",
                    bodyweight: false,
                    position: 1
                  }
                ]
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(1)
          expect(response).to have_http_status(:created)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_session"]).to include(
            "id" => TrainingSession.last.id,
            "duration" => "30:00",
            "location_type" => "indoor",
            "notes" => "This is a test strength training session",
          )
          expect(parsed_body["training_session"]["sport_details"]).to include(
            "average_heart_rate" => 120,
            "volume_load" => 3000.0,
            "volume_load_unit" => "lbs"
          )
          expect(parsed_body["training_session"]["sport_details"]["exercises"].first).to include(
            "name" => "Bench Press",
            "sets" => 3,
            "reps" => 10,
            "weight" => 100.0,
            "weight_unit" => "lbs",
            "bodyweight" => false,
            "position" => 1
          )
        end
      end
    end
  end
end