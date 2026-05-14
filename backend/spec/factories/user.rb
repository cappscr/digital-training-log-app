FactoryBot.define do
  factory :user do
    id { SecureRandom.uuid }
    name { "Example User" }
    email { "user@example.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
