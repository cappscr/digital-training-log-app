require 'rails_helper'

RSpec.describe "User signup", type: :request do
  describe "POST /api/v1/signup" do
    context "with missing user param" do
      it "does not create a user and returns a 400 Bad Request error" do
        expect {
          post api_v1_users_path, params: {}
        }.not_to change(User, :count)

        expect(response).to have_http_status(:bad_request)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body["detail"]).to eq("Required parameter missing: user")
      end
    end

    context "with invalid information" do
      it "does not create a user and returns 422 Unprocessable Content error" do
        expect {
          post api_v1_users_path, params: { user: { name: "",
                                                 email: "user@invalid",
                                                 password: "foo",
                                                 password_confirmation: "bar" } }
        }.not_to change(User, :count)

        expect(response).to have_http_status(:unprocessable_content)

        parsed_body = JSON.parse(response.body)
        expect(parsed_body["errors"].length).to eq(4)
      end

      it "should not create user with duplicate id" do
        existing_user = create(:user)
  
        post api_v1_users_path, params: {
          user: {
            id: existing_user.id,
            name: "New User",
            email: "new@example.com",
            password: "password",
            password_confirmation: "password"
          }
        }, as: :json

        assert_response :unprocessable_entity
      end
    end

    context "with valid information" do
      it "creates a user" do
        expect {
          post api_v1_users_path, params: { user: { name: "Example User",
                                                 email: "example@user.com",
                                                 password: "password",
                                                 password_confirmation: "password" } }
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
        parsed_body = JSON.parse(response.body)
        expect(parsed_body["user"]["name"]).to eq("Example User")
        expect(parsed_body["user"]["email"]).to eq("example@user.com")
        expect(parsed_body["access_token"]).not_to be_nil
        expect(response.cookies["refresh_token"]).not_to be_nil
      end
    end
  end
end
