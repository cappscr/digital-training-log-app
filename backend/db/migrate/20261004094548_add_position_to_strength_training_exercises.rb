class AddPositionToStrengthTrainingExercises < ActiveRecord::Migration[8.1]
  def up
    add_column :strength_training_exercises, :position, :integer, null: false
    change_column :strength_training_exercises, :weight, :decimal, precision: 6, scale: 1
    rename_column :strength_training_exercises, :weight_units, :weight_unit
  end

  def down
    rename_column :strength_training_exercises, :weight_unit, :weight_units
    change_column :strength_training_exercises, :weight, :integer
    remove_column :strength_training_exercises, :position
  end
end
