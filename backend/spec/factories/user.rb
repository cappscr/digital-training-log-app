FactoryBot.define do
  factory :user do
    id { SecureRandom.uuid }
    name { "Example User" }
    email { "user@example.com" }
    password { "password" }
    password_confirmation { "password" }
    activated { false }
    activated_at { nil }
    user_setting { association(:user_setting, user: instance) }
  end

  trait :activated do
    activated { true }
    activated_at { Time.zone.now }
  end
end
