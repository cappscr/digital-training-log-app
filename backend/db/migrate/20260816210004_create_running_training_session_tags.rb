class CreateRunningTrainingSessionTags < ActiveRecord::Migration[8.1]
  def change
    create_table :running_training_session_tags, id: :string do |t|
      t.references :running_training_session, null: false, foreign_key: true, type: :string
      t.string :kind, null: false

      t.timestamps
    end
  end
end
