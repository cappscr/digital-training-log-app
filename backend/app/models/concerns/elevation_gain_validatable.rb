module ElevationGainValidatable
  extend ActiveSupport::Concern

  included do
    enum :elevation_unit, { ft: "ft", m: "m" }, validate: { allow_nil: true }

    validates :elevation_gain, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
    validates :elevation_unit, presence: true, if: -> { elevation_gain.present? }
  end
end
