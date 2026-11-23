class AddDefaultTemperatureUnitToUserSettings < ActiveRecord::Migration[8.1]
  def change
    add_column :user_settings, :default_temperature_unit, :string, default: 'f', null: false
  end
end
