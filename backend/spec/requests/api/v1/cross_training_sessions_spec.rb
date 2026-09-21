require 'rails_helper'

RSpec.describe "Cross Training Sessions", type: :request do
  # create cross training session
  describe "POST /api/v1/training_sessions" do
    let(:user) { create(:user, :activated) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with distance and duration both missing" do
        it "does not create a new cross training session and returns a 422 Unprocessable Entity error" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              location_type: "outdoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "cross_training"
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

      context "without an activity in params" do
        it "does not create a new cross training session" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "indoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "cross_training"
              }
            } },
            headers: auth_headers
          }.not_to change(TrainingSession, :count)

          expect(response).to have_http_status(:unprocessable_content)
          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Can't be blank",
            "pointer" => "#/training_session/sport_details/activity"
          )
        end
      end

      context "with valid duration and missing distance" do
        it "creates a new cross training session" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "indoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "cross_training",
                activity: "Uphill Treadmill"
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(1)
        end
      end

      context "with valid parameters" do
        it "creates a new cross training session" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "indoor",
              notes: "This is a test cross training session",
              sport_details: {
                kind: "cross_training",
                activity: "Uphill Treadmill",
                distance: 4,
                distance_unit: "mi",
                elevation_gain: 800,
                elevation_unit: "ft"
              }
            } },
            headers: auth_headers
          }.to change(TrainingSession, :count).by(1)
          expect(response).to have_http_status(:created)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_session"]).to include(
            "id" => TrainingSession.last.id,
            "duration" => "1:00:00",
            "location_type" => "indoor",
            "notes" => "This is a test cross training session",
          )
          expect(parsed_body["training_session"]["sport_details"]).to include(
            "activity" => "Uphill Treadmill",
            "distance" => 4.00,
            "distance_unit" => "mi",
            "elevation_gain" => 800,
            "elevation_unit" => "ft"
          )
        end
      end
    end
  end

  # update running training session
  describe "PUT /api/v1/training_sessions/:id" do
    let(:user) { create(:user, :activated) }
    let(:cross_training_session) { create(:training_session, :cross_training, user: user) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with a valid training session id" do
        it "updates the training session and the sport details" do
          put api_v1_training_session_path(cross_training_session.id), params: { training_session: { notes: "This is a test training session", sport_details: { activity: "Aqua Jogging", distance: 0.5, distance_unit: "km", elevation_gain: nil } } }, headers: auth_headers
          expect(response).to have_http_status(:ok)
          expect(cross_training_session.reload.notes).to eq("This is a test training session")
          expect(cross_training_session.reload.sport_details.activity).to eq("Aqua Jogging")
          expect(cross_training_session.reload.sport_details.distance).to eq(0.5)
          expect(cross_training_session.reload.sport_details.distance_unit).to eq("km")
          expect(cross_training_session.reload.sport_details.elevation_gain).to eq(nil)
        end
      end
    end
  end
end
