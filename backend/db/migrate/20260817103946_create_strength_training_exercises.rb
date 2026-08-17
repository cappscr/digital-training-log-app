class CreateStrengthTrainingExercises < ActiveRecord::Migration[8.1]
  def change
    create_table :strength_training_exercises, id: :string do |t|
      t.references :strength_training_session, null: false, foreign_key: true, type: :string
      t.string :name
      t.integer :sets
      t.integer :reps
      t.integer :weight
      t.string :weight_units

      t.timestamps
    end
  end
end
