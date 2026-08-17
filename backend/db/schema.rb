# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_08_17_103946) do
  create_table "running_training_session_tags", id: :string, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "kind", null: false
    t.string "running_training_session_id", null: false
    t.datetime "updated_at", null: false
    t.index ["running_training_session_id"], name: "idx_on_running_training_session_id_f37cba9841"
  end

  create_table "running_training_session_types", id: :string, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "kind", null: false
    t.string "running_training_session_id", null: false
    t.datetime "updated_at", null: false
    t.index ["running_training_session_id"], name: "idx_on_running_training_session_id_7ed4ad0821"
  end

  create_table "running_training_sessions", id: :string, force: :cascade do |t|
    t.integer "average_cadence"
    t.integer "average_heart_rate"
    t.datetime "created_at", null: false
    t.decimal "distance", precision: 5, scale: 2
    t.integer "elevation_gain"
    t.datetime "updated_at", null: false
  end

  create_table "strength_training_exercises", id: :string, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.integer "reps"
    t.integer "sets"
    t.string "strength_training_session_id", null: false
    t.datetime "updated_at", null: false
    t.integer "weight"
    t.string "weight_units"
    t.index ["strength_training_session_id"], name: "idx_on_strength_training_session_id_371a7d4b3b"
  end

  create_table "strength_training_sessions", id: :string, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "training_session_weathers", id: :string, force: :cascade do |t|
    t.string "conditions"
    t.datetime "created_at", null: false
    t.decimal "humidity", precision: 4, scale: 1
    t.decimal "temperature", precision: 4, scale: 1
    t.string "training_session_id", null: false
    t.datetime "updated_at", null: false
    t.index ["training_session_id"], name: "index_training_session_weathers_on_training_session_id", unique: true
  end

  create_table "training_sessions", id: :string, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "duration_seconds"
    t.string "location_type", default: "outdoor", null: false
    t.text "notes"
    t.string "sport_details_id", null: false
    t.string "sport_details_type", null: false
    t.datetime "updated_at", null: false
    t.string "user_id", null: false
    t.index ["sport_details_type", "sport_details_id"], name: "index_training_sessions_on_sport_details", unique: true
    t.index ["user_id"], name: "index_training_sessions_on_user_id"
  end

  create_table "user_sessions", id: :string, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "expires_at"
    t.datetime "last_used_at"
    t.boolean "remember_me", default: false, null: false
    t.string "token_digest", null: false
    t.datetime "updated_at", null: false
    t.string "user_agent"
    t.string "user_id", null: false
    t.index ["token_digest"], name: "index_user_sessions_on_token_digest", unique: true
    t.index ["user_id"], name: "index_user_sessions_on_user_id"
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.boolean "activated", default: false
    t.datetime "activated_at"
    t.string "activation_digest"
    t.datetime "activation_sent_at"
    t.datetime "created_at", null: false
    t.datetime "deleted_at"
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "running_training_session_tags", "running_training_sessions"
  add_foreign_key "running_training_session_types", "running_training_sessions"
  add_foreign_key "strength_training_exercises", "strength_training_sessions"
  add_foreign_key "training_session_weathers", "training_sessions"
  add_foreign_key "training_sessions", "users"
  add_foreign_key "user_sessions", "users"
end
