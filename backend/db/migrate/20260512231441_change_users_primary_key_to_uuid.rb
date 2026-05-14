class ChangeUsersPrimaryKeyToUuid < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :id
    add_column :users, :id, :string, primary_key: true, null: false
  end

  def down
    remove_column :users, :id
    add_column :users, :id, :integer, primary_key: true, null: false
  end
end
