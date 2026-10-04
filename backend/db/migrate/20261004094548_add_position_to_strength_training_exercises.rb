class AddPositionToStrengthTrainingExercises < ActiveRecord::Migration[8.1]
  def change
    add_column :strength_training_exercises, :position, :integer, null: false
    change_column :strength_training_exercises, :weight, :decimal, precision: 6, scale: 1
  end
end
