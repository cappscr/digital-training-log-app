class CreateRunningTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :running_training_sessions, id: :string do |t|
      t.timestamps
    end
  end
end
