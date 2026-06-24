require 'rails_helper'

RSpec.describe "User login", type: :request do
  describe "POST /api/v1/login" do
    let(:user) { create(:user, :activated) }
    
    context "with an unactivated user" do
      let(:unactivated_user) { create(:user, email: 'unactivated@example.com') }

      it "returns a 403 Forbidden error" do
        post api_v1_login_path, params: { email: unactivated_user.email, password: unactivated_user.password }

        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)["detail"]).to eq("Account not activated")
      end
    end

    context "with invalid credentials" do
      it "returns a 401 Unauthorized error" do
        post api_v1_login_path, params: { email: user.email, password: "wrongpassword" }

        expect(response).to have_http_status(:unauthorized)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body["detail"]).to eq("Invalid credentials")
      end
    end

    context "with valid credentials" do
      it "returns an access token and refresh token cookie" do
        post api_v1_login_path, params: { email: user.email, password: user.password }

        expect(response).to have_http_status(:ok)
        expect(response.body).to include("access_token")
        expect(response.cookies['refresh_token']).not_to be_nil
      end
    end
  end

  describe "DELETE /api/v1/logout" do
    let(:user) { create(:user, :activated) }

    before do
      post api_v1_login_path, params: { email: user.email, password: user.password }
    end

    it "clears the refresh token cookie" do
      access_token = response.parsed_body["access_token"]
      refresh_token = response.cookies['refresh_token']
      delete api_v1_logout_path, headers: { "Authorization" => "Bearer #{access_token}" }

      expect(response).to have_http_status(:no_content)
      expect(response.cookies['refresh_token']).to be_nil
      expect(UserSession.find_by_token(refresh_token)).to be_nil
    end
  end

  describe "POST /api/v1/refresh" do
    let(:user) { create(:user, :activated) }

    it "returns 401 when no refresh token cookie is present" do
      post api_v1_refresh_path
      expect(response).to have_http_status(:unauthorized)
    end

    context "with a standard session" do
      before do
        post api_v1_login_path, params: { email: user.email, password: user.password }
      end

      it "returns a new access token" do
        access_token = response.parsed_body["access_token"]
        refresh_token = response.cookies['refresh_token']
        post api_v1_refresh_path, headers: { "Authorization" => "Bearer #{access_token}" }

        expect(response).to have_http_status(:ok)
        expect(response.body).to include("access_token")
        expect(response.cookies['refresh_token']).not_to eq(refresh_token) # New refresh token should be set
        expect(UserSession.find_by_token(refresh_token)).to be_nil # Token digest should be updated
      end

      it "returns 401 when the refresh token is invalid" do
        cookies[:refresh_token] = "invalid_token"
        post api_v1_refresh_path
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns 401 when the session is expired" do
        UserSession.last.update!(expires_at: 1.day.ago)
        post api_v1_refresh_path
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when remember_me is true" do
      before do
        post api_v1_login_path, params: { email: user.email, password: user.password, remember_me: true }
      end

      it "issues a refresh token that expires in 30 days after refresh" do
        post api_v1_refresh_path
        refresh_token = response.cookies['refresh_token']
        session_record = UserSession.find_by_token(refresh_token)
        expect(session_record.expires_at).to be_within(1.minute).of(30.days.from_now)
      end
    end
  end
end
