class CreateRunningTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :running_training_sessions, id: :string do |t|
      t.decimal :distance, precision: 5, scale: 2
      t.integer :elevation_gain
      t.integer :average_heart_rate
      t.integer :average_cadence
      t.timestamps
    end
  end
end
