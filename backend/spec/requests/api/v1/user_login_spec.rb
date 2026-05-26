require 'rails_helper'

RSpec.describe "User login", type: :request do
  describe "POST /api/v1/login" do
    context "with invalid credentials" do
      it "returns a 401 Unauthorized error" do
        post api_v1_login_path, params: { email: "example@user.com", password: "wrongpassword" }

        expect(response).to have_http_status(:unauthorized)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body["detail"]).to eq("Invalid credentials")
      end
    end

    context "with valid credentials" do
      it "returns an access token and refresh token cookie" do
        user = create(:user)
        post api_v1_login_path, params: { email: user.email, password: user.password }

        expect(response).to have_http_status(:ok)
        expect(response.body).to include("access_token")
        expect(response.cookies['refresh_token']).not_to be_nil
      end
    end
  end

  describe "DELETE /api/v1/logout" do
    let(:user) { create(:user) }

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
end
