class AddDistanceUnitToSportDetails < ActiveRecord::Migration[8.1]
  def change
    add_column :running_training_sessions, :distance_unit, :string
    add_column :cross_training_sessions, :distance_unit, :string
  end
end
