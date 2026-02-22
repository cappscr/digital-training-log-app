class Pace
  include ActiveModel::Model

  UNIT_MIN_PER_MILE = :min_per_mile
  UNIT_MIN_PER_KM = :min_per_km
  VALID_UNITS = [ UNIT_MIN_PER_MILE, UNIT_MIN_PER_KM ].freeze

  attr_accessor :minutes, :seconds, :units

  validates :minutes, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :seconds, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 60 }
  validates :units, presence: true, inclusion: { in: VALID_UNITS }

  def initialize(attributes = {})
    attributes[:units] = attributes[:units]&.to_sym if attributes[:units].is_a?(String)
    super(attributes)
  end

  def to_s
    # Returns a string representation of the pace, e.g. "6:18 min/mi". Returns an empty string if the record is invalid.
    return "" unless valid?
    "#{format_time} #{short_unit}"
  end

  def percentage(percent)
    # Calculates a new pace that is the given percentage faster or slower than the current pace.
    # For example, if the current pace is 6:18 min/mi, percentage(80) would return "7:34" (20% slower),
    # while percentage(110) would return "5:40" (10% faster).
    return nil unless valid?
    difference = decimal_minutes * ((100 - percent).abs / 100.0)
    new_decimal_pace = percent > 100 ? decimal_minutes - difference : decimal_minutes + difference
    decimal_to_s(new_decimal_pace)
  end

  private

  def decimal_minutes
    # Returns the pace in decimal minutes, e.g. 6.3 for a 6:18 pace.
    return nil unless valid?
    minutes + (seconds / 60.0)
  end

  def decimal_to_s(pace_as_decimal)
    # Converts a decimal pace representation back to a string format, e.g. "6:18" for 6.3 decimal minutes.
    return nil unless pace_as_decimal
    min = pace_as_decimal.floor
    sec = ((pace_as_decimal - min) * 60).round
    format("%d:%02d #{short_unit}", min, sec)
  end

  def format_time
    # Formats the minutes and seconds into a string, e.g. "6:18".
    format("%d:%02d", minutes, seconds)
  end

  def short_unit
    { UNIT_MIN_PER_MILE => "min/mi", UNIT_MIN_PER_KM => "min/km" }[units]
  end
end
