class Api::V1::PaceCalculatorController < ApplicationController
  def create
    pace = Pace.new(pace_calculator_params.except(:percentage))

    if pace.valid?
      render json: { original_pace: pace.to_s, calculated_pace: pace.percentage(pace_calculator_params[:percentage]) }
    else
      render json: { errors: pace.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def pace_calculator_params
    params.require(:pace_calculation).permit(:minutes, :seconds, :units, :percentage)
  end
end
