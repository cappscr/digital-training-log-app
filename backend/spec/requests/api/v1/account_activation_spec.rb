require 'rails_helper'

RSpec.describe "Account activation", type: :request do
  describe "PATCH /api/v1/account-activation/:id" do
    context "with an unactivated user" do
      let(:user) { create(:user) }

      context "with an invalid activation token" do
        it "returns a 404 Not Found error" do
          patch api_v1_account_activation_path(SecureRandom.urlsafe_base64), params: { email: user.email }

          expect(response).to have_http_status(:not_found)
          expect(JSON.parse(response.body)["detail"]).to eq("Invalid activation link")
        end
      end

      context "with a valid activation token" do
        it "returns the user and a 200 status" do
          patch api_v1_account_activation_path(user.activation_token), params: { email: user.email }

          expect(response).to have_http_status(:ok)
          response_body = JSON.parse(response.body)
          expect(response_body["user"]["id"]).to eq(user.id)
          expect(response_body["user"]["activated"]).to eq(true)
        end
      end
    end

    context "with an already activated user" do
      let(:activated_user) { create(:user, :activated) }

      it "returns a 404 Not Found error" do
        patch api_v1_account_activation_path(activated_user.activation_token), params: { email: activated_user.email }

        expect(response).to have_http_status(:not_found)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body["detail"]).to eq("Invalid activation link")
      end
    end
  end
end
