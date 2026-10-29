class UserSetting < ApplicationRecord
  belongs_to :user

  enum :default_distance_unit, {
    km: "km",
    mi: "mi"
  }, validate: { allow_nil: false }

  enum :default_weight_unit, {
    kg: "kg",
    lbs: "lbs"
  }, validate: { allow_nil: false }

  enum :default_elevation_unit, {
    m: "m",
    ft: "ft"
  }, validate: { allow_nil: false }

  enum :microcycle_start_day, {
    sunday: "sunday",
    monday: "monday",
  }, validate: { allow_nil: false }

  enum :theme, {
    light: "light",
    dark: "dark",
    system: "system",
  }, validate: { allow_nil: false }
end