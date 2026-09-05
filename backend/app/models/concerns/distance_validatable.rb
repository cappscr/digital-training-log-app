module DistanceValidatable
  extend ActiveSupport::Concern

  included do
    enum :distance_unit, {
      km: "km",
      mi: "mi"
    }, validate: true

    validates :distance, numericality: { greater_than: 0 }, allow_nil: true
    validates :distance_unit, presence: true, if: -> { distance.present? }
  end
end
