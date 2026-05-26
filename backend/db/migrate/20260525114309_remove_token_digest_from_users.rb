class RemoveTokenDigestFromUsers < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :token_digest, :string
  end
end
