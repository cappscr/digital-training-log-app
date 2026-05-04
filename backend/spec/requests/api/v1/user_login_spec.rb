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
      it "returns an auth token cookie" do
        user = create(:user)
        post api_v1_login_path, params: { email: user.email, password: user.password }

        expect(response).to have_http_status(:ok)
        expect(response.cookies['auth_token']).not_to be_nil
      end
    end
  end

  describe "DELETE /api/v1/logout" do
    let(:user) { create(:user) }

    before do
      post api_v1_login_path, params: { email: user.email, password: user.password }
    end

    it "clears the auth token cookie" do
      delete api_v1_logout_path

      expect(response).to have_http_status(:no_content)
      expect(response.cookies['auth_token']).to be_nil
      expect(user.reload.token_digest).to be_nil
    end
  end
end
