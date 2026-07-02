require 'rails_helper'

RSpec.describe("Password reset", type: :request) do
  let(:user) { create(:user, :activated) }

  before do
    ActionMailer::Base.deliveries.clear
  end

  describe "POST /api/v1/password-reset" do
    context "with valid email" do
      it "sends a password reset email and returns a success message" do
        post api_v1_password_resets_path, params: { email: user.email }

        expect(response).to have_http_status(:ok)
        expect(ActionMailer::Base.deliveries.size).to eq(1)
      end
    end

    context "with invalid email" do
      it "does not send a password reset email and returns an error message" do
        post api_v1_password_resets_path, params: { email: "invalid@example.com" }

        expect(response).to have_http_status(:not_found)
        expect(ActionMailer::Base.deliveries.size).to eq(0)
      end
    end
  end

  describe "PATCH /api/v1/password-reset/:token" do
    context "with valid token and email" do
      it "resets the password and returns a success message" do
        user.create_reset_digest
        patch api_v1_password_reset_path(user.reset_token), params: { email: user.email, user: { password: "newpassword", password_confirmation: "newpassword" } }

        expect(response).to have_http_status(:ok)
        expect(user.reload.authenticate("newpassword")).to be_truthy
      end
    end

    context "with invalid token" do
      it "does not reset the password and returns an error message" do
        patch api_v1_password_reset_path("invalid_token"), params: { email: user.email, user: { password: "newpassword", password_confirmation: "newpassword" } }

        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)["detail"]).to include("Invalid password reset link or link has expired")
        expect(user.reload.authenticate("newpassword")).to be_falsey
      end
    end

    context "with invalid email" do
      it "does not reset the password and returns an error message" do
        user.create_reset_digest
        patch api_v1_password_reset_path(user.reset_token), params: { email: "invalid@example.com", user: { password: "newpassword", password_confirmation: "newpassword" } }

        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)["detail"]).to include("Invalid password reset link")
        expect(user.reload.authenticate("newpassword")).to be_falsey
      end
    end

    context "with expired token" do
      it "does not reset the password and returns an error message" do
        user.create_reset_digest
        user.update_attribute(:reset_sent_at, 3.hours.ago)
        patch api_v1_password_reset_path(user.reset_token), params: { email: user.email, user: { password: "newpassword", password_confirmation: "newpassword" } }

        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)["detail"]).to include("Invalid password reset link or link has expired")
        expect(user.reload.authenticate("newpassword")).to be_falsey
      end
    end

    context "with empty password" do
      it "does not reset the password and returns an error message" do
        user.create_reset_digest
        patch api_v1_password_reset_path(user.reset_token), params: { email: user.email, user: { password: "", password_confirmation: "" } }

        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)["detail"]).to include("Password can't be empty")
        expect(user.reload.authenticate("")).to be_falsey
      end
    end

    context "with mismatched password and confirmation" do
      it "does not reset the password and returns an error message" do
        user.create_reset_digest
        patch api_v1_password_reset_path(user.reset_token), params: { email: user.email, user: { password: "newpassword", password_confirmation: "differentpassword" } }

        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)["detail"]).to include("Password reset failed")
        expect(user.reload.authenticate("newpassword")).to be_falsey
      end
    end
  end
end
