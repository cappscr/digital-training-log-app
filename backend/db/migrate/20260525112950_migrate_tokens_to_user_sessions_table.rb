class MigrateTokensToUserSessionsTable < ActiveRecord::Migration[8.1]
  def change
    create_table :user_sessions, id: :string do |t|
      t.references :user, null: false, foreign_key: true, type: :string
      t.string :token_digest, null: false
      t.boolean :remember_me, null: false, default: false
      t.string :user_agent
      t.datetime :last_used_at
      t.datetime :expires_at

      t.timestamps
    end

    add_index :user_sessions, :token_digest, unique: true
  end
end
