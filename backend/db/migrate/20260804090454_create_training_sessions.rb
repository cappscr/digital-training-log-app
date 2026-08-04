class CreateTrainingSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :training_sessions do |t|
      t.references :user, null: false, foreign_key: true, type: :string
      t.references :sport_session, polymorphic: true, null: false, index: { unique: true }, type: :string
      t.integer :duration_seconds
      t.text :notes
      t.string :location_type, null: false, default: "outdoor"

      t.timestamps
    end
  end
end
