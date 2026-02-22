class Pace
  include ActiveModel::Model

  UNIT_MIN_PER_MILE = :min_per_mile
  UNIT_MIN_PER_KM = :min_per_km
  VALID_UNITS = [UNIT_MIN_PER_MILE, UNIT_MIN_PER_KM].freeze

  attr_accessor :minutes, :seconds, :units

  validates :minutes, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :seconds, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 60 }
  validates :units, presence: true, inclusion: { in: VALID_UNITS }

  def initialize(attributes = {})
    attributes[:units] = attributes[:units]&.to_sym if attributes[:units].is_a?(String)
    super(attributes)
  end

  def to_s
    return "" unless valid?
    "#{format_time} #{short_unit}"
  end

  def percentage(percent)
    return nil unless valid?
    difference = decimal_minutes * (( 100 - percent ).abs / 100.0)
    new_decimal_pace = percent > 100 ? decimal_minutes - difference : decimal_minutes + difference
    decimal_to_s(new_decimal_pace)
  end

  private

  def decimal_minutes
    return nil unless valid?
    minutes + (seconds / 60.0)
  end

  def decimal_to_s(decimal_minutes)
    return nil unless decimal_minutes
    min = decimal_minutes.floor
    sec = ((decimal_minutes - min) * 60).round
    format('%d:%02d', min, sec)
  end

  def format_time
    format('%d:%02d', minutes, seconds)
  end

  def short_unit
    { UNIT_MIN_PER_MILE => 'min/mi', UNIT_MIN_PER_KM => 'min/km' }[units]
  end
end