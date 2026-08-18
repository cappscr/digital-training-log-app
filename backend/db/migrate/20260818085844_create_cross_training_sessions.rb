class CreateCrossTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :cross_training_sessions, id: :string do |t|
      t.integer :average_heart_rate
      t.decimal :distance, precision: 5, scale: 2
      t.integer :elevation_gain
      t.string :activity, null: false

      t.timestamps
    end
  end
end
