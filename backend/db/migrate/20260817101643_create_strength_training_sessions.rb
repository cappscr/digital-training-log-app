class CreateStrengthTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :strength_training_sessions, id: :string do |t|
      t.timestamps
    end
  end
end
