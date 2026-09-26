require 'rails_helper'

RSpec.describe "Running Training Sessions", type: :request do
  # create running training session
  describe "POST /api/v1/training_sessions" do
    let(:user) { create(:user, :activated) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with distance and duration both missing" do
        it "does not create a new training session and returns a 422 Unprocessable Entity error" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              location_type: "outdoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "running"
              }
            } },
            headers: auth_headers
          }.not_to change(TrainingSession, :count)

          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Duration and distance can't both be blank",
            "pointer" => "#/training_session/sport_details"
          )
        end
      end

      context "with valid duration and missing distance" do
        it "creates a new training session" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "outdoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "running"
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(1)
        end
      end

      context "with elevation gain and unit" do
        it "creates a running training session and returns the elevation unit" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "outdoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "running",
                distance: 10,
                distance_unit: "mi",
                elevation_gain: 800,
                elevation_unit: "ft"
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(1)

          expect(response).to have_http_status(:created)
          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_session"]["sport_details"]).to include(
            "elevation_gain" => 800,
            "elevation_unit" => "ft"
          )
        end
      end

      context "with elevation gain and no unit" do
        it "does not create a training session" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "outdoor",
              sport_details: {
                kind: "running",
                distance: 10,
                distance_unit: "mi",
                elevation_gain: 800
              }
            } },
            headers: auth_headers
          }.not_to change(TrainingSession, :count)

          expect(response).to have_http_status(:unprocessable_content)
          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Can't be blank",
            "pointer" => "#/training_session/sport_details/elevation_unit"
          )
        end
      end

      context "with valid parameters" do
        it "creates a new training session" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "outdoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "running",
                distance: 10,
                distance_unit: "mi"
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(1)
          expect(response).to have_http_status(:created)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_session"]).to include(
            "id" => TrainingSession.last.id,
            "duration" => "1:00:00",
            "location_type" => "outdoor",
            "notes" => "This is a test training session",
          )
        end
      end
    end
  end

  # update running training session
  describe "PUT /api/v1/training_sessions/:id" do
    let(:user) { create(:user, :activated) }
    let(:training_session) { create(:training_session, user: user) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with a valid training session id" do
        it "updates the training session and the sport details" do
          put api_v1_training_session_path(training_session.id), params: { training_session: { notes: "This is a test training session", sport_details: { distance: 10, distance_unit: "mi", elevation_gain: 400, elevation_unit: "m" } } }, headers: auth_headers
          expect(response).to have_http_status(:ok)
          expect(training_session.reload.notes).to eq("This is a test training session")
          expect(training_session.reload.sport_details.distance).to eq(10)
          expect(training_session.reload.sport_details.distance_unit).to eq("mi")
          expect(training_session.reload.sport_details.elevation_gain).to eq(400)
          expect(training_session.reload.sport_details.elevation_unit).to eq("m")

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_session"]["sport_details"]).to include(
            "elevation_gain" => 400,
            "elevation_unit" => "m"
          )
        end
      end
    end
  end
end
