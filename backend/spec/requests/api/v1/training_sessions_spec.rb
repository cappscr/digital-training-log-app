require 'rails_helper'

RSpec.describe "Training Sessions", type: :request do
  describe "POST /api/v1/training_sessions" do
    let(:user) { create(:user, :activated) }

    context "when not logged in" do
      it "does not create a new training session and returns a 401 Unauthorized error" do
        expect {
          post api_v1_training_sessions_path, params: { training_session: { session_date: Date.today, session_time: Time.now, duration_seconds: 3600, location_type: "running", notes: "This is a test training session" } }
        }.not_to change(TrainingSession, :count)

        expect(response).to have_http_status(:unauthorized)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body["detail"]).to eq("You must be logged in")
      end
    end

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with missing training_session param" do
        it "does not create a new training session and returns a 400 Bad Request error" do
          expect {
            post api_v1_training_sessions_path, params: { session_date: Date.today, session_time: Time.now, duration_seconds: 3600, location_type: "running", notes: "This is a test training session" },
            headers: auth_headers
          }.not_to change(TrainingSession, :count)

          expect(response).to have_http_status(:bad_request)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["detail"]).to eq("Required parameter missing: training_session")
        end
      end

      context "with invalid sport details" do
        it "does not create a new training session and returns a 422 Unprocessable Entity error" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              session_date: Date.today,
              duration_seconds: 3600,
              location_type: "outdoor",
              notes: "This is a test training session",
              sport_details: {
                kind: "running",
                distance: -1
              }
            } },
            headers: auth_headers
          }.not_to change(TrainingSession, :count)

          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Must be greater than 0",
            "pointer" => "#/training_session/sport_details/distance"
          )
        end
      end

      context "with missing distance and duration" do
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
        end
      end
    end
  end

  describe "GET /api/v1/training_sessions" do
    let(:user) { create(:user, :activated) }
    let(:other_user) { create(:user, :activated, email: "other@example.com") }
    let(:other_user_training_session) { create(:training_session, user: other_user) }

    context "when not logged in" do
      it "does not return any training sessions and returns a 401 Unauthorized error" do
        get api_v1_training_sessions_path
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "when there are no training sessions" do
        it "returns an empty array" do
          get api_v1_training_sessions_path, headers: auth_headers
          expect(response).to have_http_status(:ok)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_sessions"]).to be_empty
        end
      end

      context "when there are training sessions" do
        let!(:training_session) { create(:training_session, user: user) }

        it "returns the training sessions" do
          get api_v1_training_sessions_path, headers: auth_headers
          expect(response).to have_http_status(:ok)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_sessions"].first).to include(
            "id" => training_session.id,
            "duration" => training_session.duration,
            "location_type" => training_session.location_type,
            "notes" => training_session.notes,
            "session_date" => training_session.session_date.strftime("%Y-%m-%d"),
            "session_time" => nil,
            "user_id" => training_session.user_id,
            "sport_details_type" => training_session.sport_details_type,
          )

          expect(parsed_body["training_sessions"].first["sport_details"]).to include(
            "id" => training_session.sport_details.id,
            "distance" => training_session.sport_details.distance,
            "elevation_gain" => training_session.sport_details.elevation_gain,
            "average_heart_rate" => training_session.sport_details.average_heart_rate,
            "average_cadence" => training_session.sport_details.average_cadence,
          )
        end

        it "does not return training sessions for other users" do
          get api_v1_training_sessions_path, headers: auth_headers
          expect(response).to have_http_status(:ok)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_sessions"]).not_to include(
            "id" => other_user_training_session.id
          )
        end

        context "when there are multiple training sessions" do
          let!(:later_training_session) { create(:training_session, user: user, session_date: Date.today + 1.day) }

          it "returns training sessions with the most recent first" do
            get api_v1_training_sessions_path, headers: auth_headers
            expect(response).to have_http_status(:ok)

            parsed_body = JSON.parse(response.body)
            expect(parsed_body["training_sessions"].map { |session| session["id"] })
              .to eq([ later_training_session.id, training_session.id ])
          end
        end
      end
    end
  end
end
