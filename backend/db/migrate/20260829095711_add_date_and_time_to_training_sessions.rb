class AddDateAndTimeToTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    add_column :training_sessions, :session_date, :date, null: false
    add_column :training_sessions, :session_time, :time
  end
end
