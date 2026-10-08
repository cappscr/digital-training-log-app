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

      context "with invalid params" do
        it "returns a 422 status code" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              location_type: "indoor",
              sport_details: {
                kind: "strength_training",
                average_heart_rate: 0,
                exercises: [
                  {
                    sets: 0,
                    reps: 0,
                    weight: 0,
                    weight_unit: "invalid",
                    bodyweight: "",
                  }
                ]
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(0)
          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            { "pointer" => "#/training_session/sport_details/average_heart_rate", "detail" => "Must be greater than 0" },
            { "pointer" => "#/training_session/sport_details/exercises/0/name", "detail" => "Can't be blank" },
            { "pointer" => "#/training_session/sport_details/exercises/0/sets", "detail" => "Must be greater than 0" },
            { "pointer" => "#/training_session/sport_details/exercises/0/reps", "detail" => "Must be greater than 0" },
            { "pointer" => "#/training_session/sport_details/exercises/0/weight", "detail" => "Must be greater than 0" },
            { "pointer" => "#/training_session/sport_details/exercises/0/weight_unit", "detail" => "Is not included in the list" },
            { "pointer" => "#/training_session/sport_details/exercises/0/bodyweight", "detail" => "Is not included in the list" }
          )
        end

        context "with both weight and bodyweight params" do
          it "returns a 422 status code" do
            expect {
              post api_v1_training_sessions_path, params: { training_session: {
                session_date: Date.today,
                location_type: "indoor",
                sport_details: {
                  kind: "strength_training",
                  exercises: [
                    {
                      name: "Bench Press",
                      sets: 1,
                      reps: 3,
                      weight: 100,
                      weight_unit: "lbs",
                      bodyweight: true,
                    }
                  ]
                }
              } },
              headers: auth_headers
            }.to change(TrainingSession, :count).by(0)
            expect(response).to have_http_status(:unprocessable_content)

            parsed_body = JSON.parse(response.body)
            expect(parsed_body["errors"]).to include(
              { "pointer" => "#/training_session/sport_details/exercises/0", "detail" => "Cannot have both weight and bodyweight" }
            )
          end
        end
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

        it "returns a nil volume load unit if the exercises have different weight units" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              location_type: "indoor",
              sport_details: {
                kind: "strength_training",
                exercises: [
                  {
                    name: "Bench Press",
                    sets: 1,
                    reps: 10,
                    weight: 100,
                    weight_unit: "lbs",
                    bodyweight: false,
                    position: 1
                  },
                  {
                    name: "Bench Press",
                    sets: 2,
                    reps: 10,
                    weight: 50,
                    weight_unit: "kg",
                    bodyweight: false,
                    position: 2
                  }
                ]
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(1)
          expect(response).to have_http_status(:created)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_session"]["sport_details"]["volume_load_unit"]).to be_nil
        end
      end
    end
  end
end