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

        context "with no exercises" do
          it "returns a 422 status code" do
            expect {
              post api_v1_training_sessions_path, params: { training_session: {
                session_date: Date.today,
                location_type: "indoor",
                sport_details: {
                  kind: "strength_training",
                }
              } },
              headers: auth_headers
            }.to change(TrainingSession, :count).by(0)
            expect(response).to have_http_status(:unprocessable_content)

            parsed_body = JSON.parse(response.body)
            expect(parsed_body["errors"]).to include(
              { "pointer" => "#/training_session/sport_details/exercises", "detail" => "Must have at least one exercise" }
            )
          end
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

  # index strength training sessions
  describe "GET /api/v1/training_sessions" do
    let!(:user) { create(:user, :activated) }
    let!(:other_user) { create(:user, :activated, email: "other@example.com") }
    let!(:other_user_session) { create(:training_session, :strength_training, user: other_user) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      it "does not return strength training sessions for other users" do
        get api_v1_training_sessions_path, headers: auth_headers
        expect(response).to have_http_status(:ok)
        parsed_body = JSON.parse(response.body)
        expect(parsed_body["training_sessions"].map { |session| session["id"] }).not_to include(other_user_session.id)
      end

      context "with valid parameters" do
        it "returns a list of strength training sessions" do
          create(:training_session, :strength_training, user: user)
          create(:training_session, :strength_training, user: user)

          get api_v1_training_sessions_path, headers: auth_headers
          expect(response).to have_http_status(:ok)
          parsed_body = JSON.parse(response.body)
          expect(parsed_body["training_sessions"].count).to eq(2)
          expect(parsed_body["training_sessions"].map { |session| session["user_id"] }).to include(user.id)
        end
      end
    end

    context "when not logged in" do
      it "returns a 401 status code" do
        get api_v1_training_sessions_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # show strength training session
  describe "GET /api/v1/training_sessions/:id" do
    let!(:user) { create(:user, :activated) }
    let!(:other_user) { create(:user, :activated, email: "other@example.com") }
    let!(:session) { create(:training_session, :strength_training, user: user) }
    let!(:other_user_session) { create(:training_session, :strength_training, user: other_user) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      it "returns the strength training session" do
        get api_v1_training_session_path(session.id), headers: auth_headers
        expect(response).to have_http_status(:ok)
        parsed_body = JSON.parse(response.body)
        expect(parsed_body["training_session"]["id"]).to eq(session.id)
      end

      it "does not return strength training sessions for other users" do
        get api_v1_training_session_path(other_user_session.id), headers: auth_headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context "when not logged in" do
      it "returns a 401 status code" do
        get api_v1_training_session_path(session.id)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # update strength training session
  describe "PUT /api/v1/training_sessions/:id" do
    let!(:user) { create(:user, :activated) }
    let!(:session) { create(:training_session, user: user, sport_details:
      build(:strength_training_session, exercises: [
        build(:strength_training_exercise, name: "Bench Press", position: 1),
        build(:strength_training_exercise, name: "Deadlift", position: 2),
      ])
    ) }
    let!(:other_user) { create(:user, :activated, email: "other@example.com") }
    let!(:other_user_session) { create(:training_session, :strength_training, user: other_user) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      it "replaces the exercise list" do
        kept = session.sport_details.exercises.find_by!(name: "Bench Press")
        removed = session.sport_details.exercises.find_by!(name: "Deadlift")
      
        put api_v1_training_session_path(session.id), params: { training_session: {
          sport_details: {
            exercises: [
              {
                # The id is nil because this is a new exercise
                # This will be a client-generated UUID by the frontend
                id: nil,
                name: "Pull-Ups",
                sets: 3,
                reps: 8,
                bodyweight: true,
                weight: nil,
                weight_unit: nil,
                position: 1
              },
              {
                id: kept.id,
                name: "Back Squat",
                sets: 5,
                reps: 5,
                weight: 185,
                weight_unit: "lbs",
                bodyweight: false,
                position: 2
              }
            ]
          }
        } }, headers: auth_headers

        expect(response).to have_http_status(:ok)
      
        exercises = JSON.parse(response.body).dig("training_session", "sport_details", "exercises")
        expect(exercises).to contain_exactly(
          a_hash_including("name" => "Pull-Ups", "position" => 1),
          a_hash_including("id" => kept.id, "name" => "Back Squat", "position" => 2)
        )
        expect(exercises.map { |exercise| exercise["id"] }).not_to include(removed.id)
        expect(session.sport_details.exercises.reload.map(&:position)).to eq([1, 2])
      end

      it "does not update strength training sessions for other users" do
        put api_v1_training_session_path(other_user_session.id), params: { training_session: {
          sport_details: {
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
        } }, headers: auth_headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context "when not logged in" do
      it "returns a 401 status code" do
        put api_v1_training_session_path(session.id)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # destroy strength training session
  describe "DELETE /api/v1/training_sessions/:id" do
    let!(:user) { create(:user, :activated) }
    let!(:session) { create(:training_session, :strength_training, user: user) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      it "destroys the strength training session" do
        delete api_v1_training_session_path(session.id), headers: auth_headers
        expect(response).to have_http_status(:no_content)
        expect(TrainingSession.count).to eq(0)
      end
    end

    context "when not logged in" do
      it "returns a 401 status code" do
        delete api_v1_training_session_path(session.id)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end