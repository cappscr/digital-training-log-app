class AddTokenDigestToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :token_digest, :string
    add_index :users, :token_digest, unique: true
  end
end
