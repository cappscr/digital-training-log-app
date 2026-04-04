require 'rails_helper'

RSpec.describe "Api::V1::PaceCalculators", type: :request do
  describe "POST /api/v1/pace-calculators" do
    let(:valid_params) do
      {
        pace_calculation: {
          minutes: 8,
          seconds: 0,
          units: "per_mile",
          percentage: 110
        }
      }
    end

    context "with valid parameters" do
      it "calculates the new pace and returns http success" do
        post api_v1_pace_calculator_index_path, params: valid_params, as: :json

        expect(response).to have_http_status(:success)

        json_response = JSON.parse(response.body)
        # 8:00 - 10% = 7:12
        expect(json_response["calculated_pace"]).to eq("7:12")
        expect(json_response["units"]).to eq("per_mile")
        expect(json_response["original_pace"]).to eq("8:00")
        expect(json_response["percentage"]).to eq(110)
      end
    end

    context "with invalid parameters" do
      it "returns bad request if pace_calculation is missing" do
        invalid_params = { pace: { minutes: 8, seconds: 0, units: "per_mile", percentage: 80 } }

        post api_v1_pace_calculator_index_path, params: invalid_params, as: :json

        expect(response).to have_http_status(:bad_request)
      end

      it "returns unprocessable entity for invalid seconds" do
        invalid_params = { pace_calculation: { minutes: 8, seconds: 65, units: "per_mile", percentage: 100 } }

        post api_v1_pace_calculator_index_path, params: invalid_params, as: :json

        expect(response).to have_http_status(:unprocessable_content)

        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to include("Seconds must be less than 60")
      end

      it "returns unprocessable entity for missing units" do
        invalid_params = { pace_calculation: { minutes: 8, seconds: 0, units: "", percentage: 100 } }

        post api_v1_pace_calculator_index_path, params: invalid_params, as: :json

        expect(response).to have_http_status(:unprocessable_content)
      end
    end
  end
end
