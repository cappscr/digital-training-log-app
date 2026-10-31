# frozen_string_literal: true

DEFAULT_USER_SETTINGS = {
  default_distance_unit: "mi",
  default_weight_unit: "lbs",
  default_elevation_unit: "ft",
  microcycle_start_day: "monday",
  theme: "dark"
}.freeze

class AddUserSettingsForAllUsers < ActiveRecord::Migration[8.1]
  def up
    User.where.missing(:user_setting).find_each do |user|
      user.create_user_setting!(DEFAULT_USER_SETTINGS)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
