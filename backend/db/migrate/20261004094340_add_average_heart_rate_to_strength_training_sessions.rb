class AddAverageHeartRateToStrengthTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    add_column :strength_training_sessions, :average_heart_rate, :integer
  end
end
