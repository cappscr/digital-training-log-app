class AddElevationUnitToRunningTrainingSessions < ActiveRecord::Migration[8.1]
  def up
    add_column :running_training_sessions, :elevation_unit, :string

    execute <<~SQL.squish
      UPDATE running_training_sessions
      SET elevation_unit = 'ft'
      WHERE elevation_gain IS NOT NULL
        AND (elevation_unit IS NULL OR elevation_unit = '')
    SQL
  end

  def down
    remove_column :running_training_sessions, :elevation_unit
  end
end
