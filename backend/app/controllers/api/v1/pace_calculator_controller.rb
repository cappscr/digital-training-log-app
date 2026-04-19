class Api::V1::PaceCalculatorController < ApplicationController
  def create
    pace = Pace.new(pace_calculator_params.except(:percentage))

    return render json: { errors: pace.errors.full_messages }, status: :unprocessable_content unless pace.valid?

    calculation = PaceCalculation.new(
      percentage: pace_calculator_params[:percentage],
      original_pace: pace.to_s(include_units: true),
      calculated_pace: pace.percentage(pace_calculator_params[:percentage].to_i).to_s,
      units: pace_calculator_params[:units]
    )

    render json: calculation, status: :ok
  end

  private

  def pace_calculator_params
    params.require(:pace_calculation).permit(:minutes, :seconds, :units, :percentage)
  end
end
