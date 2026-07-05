require 'rails_helper'

RSpec.describe "Account activation", type: :request do
  before do
    ActionMailer::Base.deliveries.clear
  end

  describe "POST /api/v1/account-activation" do
    context "with a valid email" do
      let(:user) { create(:user) }

      it "sends an activation email and returns a 200 status" do
        post api_v1_account_activations_path, params: { email: user.email }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["message"]).to eq("Activation email sent")
        expect(ActionMailer::Base.deliveries.size).to eq(1)
      end
    end

    context "with an already activated user" do
      let(:activated_user) { create(:user, :activated) }

      it "returns a 403 Forbidden error" do
        post api_v1_account_activations_path, params: { email: activated_user.email }

        expect(response).to have_http_status(:forbidden)
        parsed_body = JSON.parse(response.body)
        expect(parsed_body["detail"]).to eq("User is already activated")
      end
    end

    context "with an invalid email" do
      it "returns a 404 Not Found error" do
        post api_v1_account_activations_path, params: { email: "invalid@example.com" }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)["detail"]).to eq("Email address not found")
      end
    end
  end

  describe "PATCH /api/v1/account-activation/:id" do
    context "with an unactivated user" do
      let(:user) { create(:user) }

      context "with an invalid activation token" do
        it "returns a 404 Not Found error" do
          patch api_v1_account_activation_path(SecureRandom.urlsafe_base64), params: { email: user.email }

          expect(response).to have_http_status(:not_found)
          expect(JSON.parse(response.body)["detail"]).to eq("Invalid or expired activation link")
        end
      end

      context "with an expired activation token" do
        let(:user_with_expired_activation) { create(:user, email: "expired@example.com") }

        it "returns a 404 Not Found error" do
          user_with_expired_activation.update_columns(activation_sent_at: 25.hours.ago)
          patch api_v1_account_activation_path(user_with_expired_activation.activation_token), params: { email: user_with_expired_activation.email }

          expect(response).to have_http_status(:not_found)
          expect(JSON.parse(response.body)["detail"]).to eq("Invalid or expired activation link")
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
        expect(parsed_body["detail"]).to eq("Invalid or expired activation link")
      end
    end
  end
end
