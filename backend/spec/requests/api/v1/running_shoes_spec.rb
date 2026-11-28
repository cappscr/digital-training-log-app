require 'rails_helper'

RSpec.describe "Running Shoes", type: :request do
  # index
  describe "GET /api/v1/running_shoes" do
    let(:user) { create(:user, :activated) }
    let(:other_user) { create(:user, :activated, email: "other@example.com") }

    let(:daily_trainers) { create(:running_shoe, user: user) }
    let(:race_day_shoe) { create(:running_shoe, user: user, brand: "PUMA", model: "Fast-R") }
    let(:tempo_shoe) { create(:running_shoe, user: user, brand: "New Balance", model: "Fuel Cell Rebel v5") }
    let(:retired_shoe) { create(:running_shoe, :retired, user: user) }
    let(:other_user_shoe) { create(:running_shoe, user: other_user) }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      it "returns a list of all a user's running shoes" do
        shoes = [ daily_trainers, race_day_shoe, tempo_shoe, retired_shoe ]

        get api_v1_running_shoes_path, headers: auth_headers
        expect(response).to have_http_status(:success)
        expect(response.parsed_body["running_shoes"].map { |shoe| shoe["id"] })
          .to contain_exactly(*shoes.map(&:id))
      end

      it "does not return other user's shoes" do
        get api_v1_running_shoes_path, headers: auth_headers
        expect(response).to have_http_status(:success)
        expect(response.parsed_body["running_shoes"]).not_to include(
          other_user_shoe.as_json
        )
      end
    end

    context "when not logged in" do
      it "returns a 401 Unauthorized error" do
        get api_v1_running_shoes_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  # create
  describe "POST /api/v1/running_shoes" do
    let(:user) { create(:user, :activated) }
    let(:other_user) { create(:user, :activated, email: "other@example.com") }

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with missing running_shoe param" do
        it "does not create a new running shoe and returns a 400 Bad Request error" do
          expect {
            post api_v1_running_shoes_path, params: { brand: "Nike", model: "Pegasus 39" }, headers: auth_headers
          }.not_to change(RunningShoe, :count)
          expect(response).to have_http_status(:bad_request)
        end
      end

      context "with missing brand param" do
        it "does not create a new running shoe and returns a 422 Unprocessable Content error" do
          expect {
            post api_v1_running_shoes_path, params: { running_shoe: { model: "Pegasus 39" } }, headers: auth_headers
          }.not_to change(RunningShoe, :count)
          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Can't be blank",
            "pointer" => "#/running_shoe/brand"
          )
        end
      end

      context "with missing model param" do
        it "does not create a new running shoe and returns a 422 Unprocessable Content error" do
          expect {
            post api_v1_running_shoes_path, params: { running_shoe: { brand: "Nike" } }, headers: auth_headers
          }.not_to change(RunningShoe, :count)
          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Can't be blank",
            "pointer" => "#/running_shoe/model"
          )
        end
      end

      context "with invalid brand, model, or nickname" do
        it "does not create a new running shoe and returns a 422 Unprocessable Content error" do
          expect {
            post api_v1_running_shoes_path, params: { running_shoe: {
              brand: "a" * 101,
              model: "a" * 101,
              nickname: "a" * 101 } }, headers: auth_headers
          }.not_to change(RunningShoe, :count)
          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Is too long (maximum is 100 characters)",
            "pointer" => "#/running_shoe/brand"
          )
          expect(parsed_body["errors"]).to include(
            "detail" => "Is too long (maximum is 100 characters)",
            "pointer" => "#/running_shoe/model"
          )
          expect(parsed_body["errors"]).to include(
            "detail" => "Is too long (maximum is 100 characters)",
            "pointer" => "#/running_shoe/nickname"
          )
        end
      end

      context "with an invalid future dated date_first_used" do
        it "does not create a new running shoe and returns a 422 Unprocessable Content error" do
          expect {
            post api_v1_running_shoes_path, params: { running_shoe: {
              brand: "Nike",
              model: "Pegasus 39",
              date_first_used: Date.today + 1.year } }, headers: auth_headers
          }.not_to change(RunningShoe, :count)
          expect(response).to have_http_status(:unprocessable_content)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["errors"]).to include(
            "detail" => "Must be less than or equal to #{Date.today.strftime("%Y-%m-%d")}",
            "pointer" => "#/running_shoe/date_first_used"
          )
        end
      end

      context "with date_retired in params" do
        it "creates a new running shoe without date_retired set" do
          expect {
            post api_v1_running_shoes_path, params: { running_shoe: {
              brand: "Nike",
              model: "Pegasus 39",
              date_retired: "2026-01-01" } }, headers: auth_headers
          }.to change(RunningShoe, :count).by(1)
            expect(response).to have_http_status(:created)

            parsed_body = JSON.parse(response.body)
            expect(parsed_body["date_retired"]).to be_nil
        end
      end

      context "with user_id in params" do
        it "creates a new running shoe belonging to the current_user and ignoring user_id" do
          expect {
            post api_v1_running_shoes_path, params: { running_shoe: {
              brand: "Nike",
              model: "Pegasus 39",
              user_id: other_user.id } }, headers: auth_headers
          }.to change(RunningShoe, :count).by(1)
          expect(response).to have_http_status(:created)

          expect(RunningShoe.last.user_id).to eq(user.id)
        end
      end

      context "with valid params" do
        it "creates and returns a new running shoe" do
          expect {
            post api_v1_running_shoes_path, params: { running_shoe: { brand: "Nike", model: "Pegasus 39", date_first_used: Date.today } }, headers: auth_headers
          }.to change(RunningShoe, :count).by(1)
          expect(response).to have_http_status(:created)

          parsed_body = JSON.parse(response.body)
          expect(parsed_body["running_shoe"]["brand"]).to eq("Nike")
          expect(parsed_body["running_shoe"]["model"]).to eq("Pegasus 39")
          expect(parsed_body["running_shoe"]["date_first_used"]).to eq(Date.today.strftime("%Y-%m-%d"))
          expect(parsed_body["running_shoe"]["date_retired"]).to be_nil
        end
      end
    end

    context "when not logged in" do
      it "does not create a new running shoe and returns a 401 Unauthorized error" do
        expect {
          post api_v1_running_shoes_path, params: { running_shoe: { brand: "Nike", model: "Pegasus 39" } }
        }.not_to change(RunningShoe, :count)
        expect(response).to have_http_status(:unauthorized)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body["detail"]).to eq("You must be logged in")
      end
    end
  end
end
