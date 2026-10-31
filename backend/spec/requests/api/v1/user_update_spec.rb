require 'rails_helper'

RSpec.describe "User update", type: :request do
  describe "PATCH /api/v1/users/me" do
    let(:user) { create(:user, :activated) }
    let(:update_params) { { user: { name: "New Name" } } }

    context "when not logged in" do
      it "returns a 401 Unauthorized error" do
        patch api_v1_users_me_path(user), params: update_params
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when logged in" do
      let(:auth_headers) { { "Authorization" => "Bearer #{access_token}" } }
      let(:access_token) do
        post api_v1_login_path, params: { email: user.email, password: user.password }
        response.parsed_body["access_token"]
      end

      context "with missing user param" do
        it "returns a 400 Bad Request error" do
          patch api_v1_users_me_path(user), params: {}, headers: auth_headers
          expect(response).to have_http_status(:bad_request)
        end
      end

      context "with an invalid user param" do
        it "returns a 422 Unprocessable Content error" do
          patch api_v1_users_me_path(user), params: { user: { name: "a" * 101 } }, headers: auth_headers
          expect(response).to have_http_status(:unprocessable_content)
          expect(user.reload.name).not_to eq("a" * 101)
        end

        it "rolls back the transaction if either the user or settings update fails" do
          patch api_v1_users_me_path(user), params: { user: { name: "New Name", microcycle_start_day: "tuesday" } }, headers: auth_headers
          expect(response).to have_http_status(:unprocessable_content)
          expect(user.reload.name).not_to eq("New Name")
        end
      end

      context "with valid user param" do
        it "updates the user" do
          patch api_v1_users_me_path(user), params: update_params, headers: auth_headers
          expect(response).to have_http_status(:ok)
          expect(user.reload.name).to eq("New Name")
        end

        it "updates the user setting" do
          patch api_v1_users_me_path(user), params: { user: { microcycle_start_day: "sunday", default_weight_unit: "kg", default_distance_unit: "km", default_elevation_unit: "m" } }, headers: auth_headers
          expect(response).to have_http_status(:ok)
          expect(user.reload.user_setting.microcycle_start_day).to eq("sunday")
          expect(user.reload.user_setting.default_weight_unit).to eq("kg")
          expect(user.reload.user_setting.default_distance_unit).to eq("km")
          expect(user.reload.user_setting.default_elevation_unit).to eq("m")
        end

        it "only updates settings passed in the request" do
          patch api_v1_users_me_path(user), params: { user: { microcycle_start_day: "sunday" } }, headers: auth_headers
          expect(response).to have_http_status(:ok)
          expect(user.reload.name).to eq("Example User")
          expect(user.reload.user_setting.microcycle_start_day).to eq("sunday")
          expect(user.reload.user_setting.default_weight_unit).to eq("lbs")
          expect(user.reload.user_setting.default_distance_unit).to eq("mi")
          expect(user.reload.user_setting.default_elevation_unit).to eq("ft")
        end
      end
    end
  end
end