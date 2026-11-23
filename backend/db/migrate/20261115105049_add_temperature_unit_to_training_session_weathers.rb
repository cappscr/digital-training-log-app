class AddTemperatureUnitToTrainingSessionWeathers < ActiveRecord::Migration[8.1]
  def up
    add_column :training_session_weathers, :temperature_unit, :string
    change_column :training_session_weathers, :humidity, :integer
  end

  def down
    change_column :training_session_weathers, :humidity, :decimal, precision: 4, scale: 1
    remove_column :training_session_weathers, :temperature_unit
  end
end
