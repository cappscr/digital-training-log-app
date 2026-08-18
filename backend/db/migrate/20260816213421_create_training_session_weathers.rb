class CreateTrainingSessionWeathers < ActiveRecord::Migration[8.1]
  def change
    create_table :training_session_weathers, id: :string do |t|
      t.references :training_session, null: false, foreign_key: true, type: :string, index: { unique: true }
      t.decimal :temperature, precision: 4, scale: 1
      t.decimal :humidity, precision: 4, scale: 1
      t.string :conditions

      t.timestamps
    end
  end
end
