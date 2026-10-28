class CreateUserSettings < ActiveRecord::Migration[8.1]
  def change
    create_table :user_settings, id: :string do |t|
      t.string :default_distance_unit, null: false, default: 'mi'
      t.string :default_elevation_unit, null: false, default: 'ft'
      t.string :default_weight_unit, null: false, default: 'lbs'
      t.string :microcycle_start_day, null: false, default: 'monday'
      t.string :theme, null: false, default: 'dark'

      t.references :user, null: false, foreign_key: true, type: :string, index: { unique: true }

      t.timestamps
    end
  end
end
