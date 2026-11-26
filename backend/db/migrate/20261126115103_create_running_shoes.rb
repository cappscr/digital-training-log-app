class CreateRunningShoes < ActiveRecord::Migration[8.1]
  def change
    create_table :running_shoes, id: :string do |t|
      t.string :brand, null: false
      t.string :model, null: false
      t.string :nickname
      t.date :date_first_used
      t.date :date_retired
      t.belongs_to :user, null: false, foreign_key: true, type: :string

      t.timestamps
    end
  end
end
