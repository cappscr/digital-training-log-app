RSpec.describe "catch-all route", type: :request do
  describe "GET /api/v1/nonexistent-path" do
    before { get "/api/v1/nonexistent-path" }

    it "returns 404" do
      expect(response).to have_http_status(:not_found)
    end

    it "returns a problem body in RFC 9457 shape" do
      body = response.parsed_body
      expect(body).to include(
        "status" => 404,
        "title" => "Resource Not Found",
        "detail" => "No route matches /api/v1/nonexistent-path"
      )
    end
  end
  
  describe "GET /api/nonexistent-path" do
    before { get "/api/nonexistent-path" }

    it "returns 404" do
      expect(response).to have_http_status(:not_found)
    end

    it "returns a problem body in RFC 9457 shape" do
      body = response.parsed_body
      expect(body).to include(
        "status" => 404,
        "title" => "Resource Not Found",
        "detail" => "No route matches /api/nonexistent-path"
      )
    end
  end
end
