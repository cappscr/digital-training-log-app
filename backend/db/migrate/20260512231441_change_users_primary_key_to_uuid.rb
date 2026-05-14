class ChangeUsersPrimaryKeyToUuid < ActiveRecord::Migration[8.1]
  def up
    remove_column :users, :id
    add_column :users, :id, :string, null: true
    execute "UPDATE users SET id = gen_random_uuid() WHERE id IS NULL"
    change_column_null :users, :id, false
    execute "ALTER TABLE users ADD PRIMARY KEY (id)"
  end

  def down
    execute "ALTER TABLE users DROP CONSTRAINT users_pkey"
    remove_column :users, :id
    add_column :users, :id, :integer, primary_key: true, null: false
  end
end
