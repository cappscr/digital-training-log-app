require 'rails_helper'

RSpec.describe "Training Sessions", type: :request do
  # create training session
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

      context "with missing sport details param" do
        it "does not create a new training session and returns a 400 Bad Request error" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: { session_date: Date.today, session_time: Time.now, duration_seconds: 3600, location_type: "outdoor", notes: "This is a test training session" } },
            headers: auth_headers
          }.not_to change(TrainingSession, :count)

          expect(response).to have_http_status(:bad_request)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["detail"]).to eq("Required parameter missing: sport_details")
        end
      end

      context "with unsupported sport_details kind" do
        it "does not create a new training session and returns a 422 Unprocessable Content error" do
          expect {
            post api_v1_training_sessions_path, params: { training_session: {
              sport_details: {
                kind: "invalid_kind"
              }
            } },
            headers: auth_headers
          }.not_to change(TrainingSession, :count)

          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Unknown sport kind: invalid_kind",
            "pointer" => "#/training_session/sport_details/kind"
          )
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
    end
  end

  # update training session
  describe "PUT /api/v1/training_sessions/:id" do
    let(:user) { create(:user, :activated) }
    let(:training_session) { create(:training_session, user: user) }

    context "when not logged in" do
      it "does not update the training session and returns a 401 Unauthorized error" do
        put api_v1_training_session_path(training_session.id), params: { training_session: { notes: "This is a test training session" } }

        expect(response).to have_http_status(:unauthorized)
        expect(training_session.reload.notes).not_to eq("This is a test training session")
      end
    end

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "when id or kind is passed in the request params" do
        let(:cross_training_session) { create(:training_session, :cross_training, user: user) }

        it "does not update the sport kind" do
          put api_v1_training_session_path(cross_training_session.id), params: { training_session: { notes: "This is a test training session", sport_details: { kind: 'running', distance: 10, distance_unit: "mi", elevation_gain: 400 } } }, headers: auth_headers
          expect(response).to have_http_status(:ok)
          expect(cross_training_session.reload.notes).to eq("This is a test training session")
          expect(cross_training_session.reload.sport_details_type).to eq('CrossTrainingSession')
          expect(cross_training_session.reload.sport_details.distance).to eq(10)
          expect(cross_training_session.reload.sport_details.distance_unit).to eq("mi")
          expect(cross_training_session.reload.sport_details.elevation_gain).to eq(400)
        end

        it "does not update the sport_details id" do
          original_id = cross_training_session.sport_details.id
          put api_v1_training_session_path(cross_training_session.id), params: { training_session: { notes: "This is a test training session", sport_details: { id: '94747ea4-2f7d-4405-a5fb-8b27669ef89c', distance: 10, distance_unit: "mi", elevation_gain: 400 } } }, headers: auth_headers
          expect(response).to have_http_status(:ok)
          expect(cross_training_session.reload.notes).to eq("This is a test training session")
          expect(cross_training_session.reload.sport_details_type).to eq('CrossTrainingSession')
          expect(cross_training_session.reload.sport_details.id).to eq(original_id)
          expect(cross_training_session.reload.sport_details.distance).to eq(10)
          expect(cross_training_session.reload.sport_details.distance_unit).to eq("mi")
          expect(cross_training_session.reload.sport_details.elevation_gain).to eq(400)
        end
      end

      context "when the training session is not found" do
        it "does not update the training session and returns a 404 Not Found error" do
          put api_v1_training_session_path('invalid-id'), params: { training_session: { notes: "This is a test training session", sport_details: { distance: 10, distance_unit: "mi", elevation_gain: 400 } } }, headers: auth_headers
          expect(response).to have_http_status(:not_found)
          expect(training_session.reload.notes).not_to eq("This is a test training session")
        end
      end
    end
  end

  # index training sessions
  describe "GET /api/v1/training_sessions" do
    let(:user) { create(:user, :activated) }
    let(:other_user) { create(:user, :activated, email: "other@example.com") }
    let!(:other_user_training_session) { create(:training_session, user: other_user) }

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
            "elevation_unit" => training_session.sport_details.elevation_unit,
            "average_heart_rate" => training_session.sport_details.average_heart_rate,
            "average_cadence" => training_session.sport_details.average_cadence,
          )
        end

        it "does not return training sessions for other users" do
          get api_v1_training_sessions_path, headers: auth_headers
          expect(response).to have_http_status(:ok)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_sessions"].map { |session| session["id"] })
            .not_to include(other_user_training_session.id)
        end

        context "on multiple days" do
          let!(:later_training_session) { create(:training_session, user: user, session_date: Date.today + 1.day) }

          it "returns training sessions with the most recent first" do
            get api_v1_training_sessions_path, headers: auth_headers
            expect(response).to have_http_status(:ok)

            parsed_body = JSON.parse(response.body)
            expect(parsed_body["training_sessions"].map { |session| session["id"] })
              .to eq([ later_training_session.id, training_session.id ])
          end
        end

        context "on the same day" do
          let!(:morning_training_session) { create(:training_session, user: user, session_date: Date.today, session_time: "07:00") }
          let!(:afternoon_training_session) { create(:training_session, user: user, session_date: Date.today, session_time: "17:00") }

          it "returns training sessions with the same session date in the correct order" do
            get api_v1_training_sessions_path, headers: auth_headers
            expect(response).to have_http_status(:ok)

            parsed_body = JSON.parse(response.body)
            expect(parsed_body["training_sessions"].map { |session| session["id"] })
              # sort by session_date and then session_time with null session_time last
              .to eq([ afternoon_training_session.id, morning_training_session.id, training_session.id ])
          end
        end
      end
    end
  end

  # show training session
  describe "GET /api/v1/training_sessions/:id" do
    let(:user) { create(:user, :activated) }
    let(:other_user) { create(:user, :activated, email: "other@example.com") }
    let!(:other_user_training_session) { create(:training_session, user: other_user) }
    let!(:training_session) { create(:training_session, user: user) }

    context "when not logged in" do
      it "does not return a training session and returns a 401 Unauthorized error" do
        get api_v1_training_session_path(training_session.id)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "when the id is invalid" do
        it "returns a 404 Not Found error" do
          get api_v1_training_session_path('invalid-id'), headers: auth_headers
          expect(response).to have_http_status(:not_found)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["detail"]).to eq("Training session not found")
        end
      end

      context "when there are training sessions" do
        it "returns the specified training session" do
          get api_v1_training_session_path(training_session.id), headers: auth_headers
          expect(response).to have_http_status(:ok)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_session"]).to include(
            "id" => training_session.id,
            "duration" => training_session.duration,
            "location_type" => training_session.location_type,
            "notes" => training_session.notes,
            "session_date" => training_session.session_date.strftime("%Y-%m-%d"),
            "session_time" => nil,
            "user_id" => training_session.user_id,
            "sport_details_type" => training_session.sport_details_type,
          )

          expect(parsed_body["training_session"]["sport_details"]).to include(
            "id" => training_session.sport_details.id,
            "distance" => training_session.sport_details.distance,
            "elevation_gain" => training_session.sport_details.elevation_gain,
            "elevation_unit" => training_session.sport_details.elevation_unit,
            "average_heart_rate" => training_session.sport_details.average_heart_rate,
            "average_cadence" => training_session.sport_details.average_cadence,
          )
        end

        it "does not return training sessions for other users" do
          get api_v1_training_session_path(other_user_training_session.id), headers: auth_headers
          expect(response).to have_http_status(:not_found)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["detail"]).to eq("Training session not found")
        end
      end
    end
  end

  # destroy training session
  describe "DELETE /api/v1/training_sessions/:id" do
    let!(:user) { create(:user, :activated) }
    let!(:training_session) { create(:training_session, user: user) }
    let!(:other_user) { create(:user, :activated, email: "other@example.com") }
    let!(:other_user_training_session) { create(:training_session, user: other_user) }

    context "when not logged in" do
      it "does not destroy the training session and returns a 401 Unauthorized error" do
        expect {
          delete api_v1_training_session_path(training_session.id)
        }.not_to change(TrainingSession, :count)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "when the training session is not found or not owned by the user" do
        it "does not destroy the training session and returns a 404 Not Found error" do
          expect {
            delete api_v1_training_session_path('invalid-id'), headers: auth_headers
          }.not_to change(TrainingSession, :count)
          expect(response).to have_http_status(:not_found)
        end

        it "does not destroy other user's training sessions" do
          expect {
            delete api_v1_training_session_path(other_user_training_session.id), headers: auth_headers
          }.not_to change(TrainingSession, :count)
          expect(response).to have_http_status(:not_found)
        end
      end

      context "when the training session is found" do
        it "destroys the training session" do
          expect {
            delete api_v1_training_session_path(training_session.id), headers: auth_headers
          }.to change(TrainingSession, :count).by(-1)
          expect(response).to have_http_status(:no_content)
        end

        it "also destroys the sport details" do
          expect {
            delete api_v1_training_session_path(training_session.id), headers: auth_headers
          }.to change(RunningTrainingSession, :count).by(-1)
          expect(response).to have_http_status(:no_content)
        end
      end
    end
  end
end
