FactoryBot.define do
  factory :user do
    id { SecureRandom.uuid }
    name { "Example User" }
    email { "user@example.com" }
    password { "password" }
    password_confirmation { "password" }
    activated { false }
    activated_at { nil }
  end

  trait :activated do
    activated { true }
    activated_at { Time.zone.now }
  end
end
