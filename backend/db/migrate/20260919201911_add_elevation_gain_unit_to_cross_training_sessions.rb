class AddElevationGainUnitToCrossTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    add_column :cross_training_sessions, :elevation_unit, :string
  end
end
