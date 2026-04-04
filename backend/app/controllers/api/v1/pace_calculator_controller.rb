class Api::V1::PaceCalculatorController < ApplicationController
  def create
    pace = Pace.new(pace_calculator_params.except(:percentage))

    return render json: { errors: pace.errors.full_messages }, status: :unprocessable_content unless pace.valid?

    new_pace = pace.percentage(pace_calculator_params[:percentage].to_i)

    render json: { percentage: pace_calculator_params[:percentage], original_pace: pace.to_s, calculated_pace: new_pace.to_s, units: pace_calculator_params[:units] }, status: :ok
  end

  private

  def pace_calculator_params
    params.require(:pace_calculation).permit(:minutes, :seconds, :units, :percentage)
  end
end
