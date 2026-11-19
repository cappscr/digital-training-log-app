class TrainingSessionWeather < ApplicationRecord
  belongs_to :training_session

  before_save :trim_conditions

  before_validation :set_temperature_unit_to_nil

  enum :temperature_unit, {
    f: "f",
    c: "c"
  }, validate: { allow_nil: true }

  validates :humidity, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, only_integer: true }, allow_nil: true
  validates :temperature, numericality: true, allow_nil: true
  validate :temperature_has_at_most_one_decimal_place
  validates :temperature_unit, presence: true, if: -> { temperature.present? }

  private

  def trim_conditions
    conditions.strip! if conditions.present?
  end

  def temperature_has_at_most_one_decimal_place
    raw_temp = temperature_before_type_cast
    return if raw_temp.blank?

    value = raw_temp.is_a?(BigDecimal) ? raw_temp : BigDecimal(raw_temp.to_s)
    return if value == value.round(1)

    errors.add(:temperature, "must have at most one decimal place")
  rescue ArgumentError
  end

  def set_temperature_unit_to_nil
    self.temperature_unit = nil if temperature.blank?
  end
end
