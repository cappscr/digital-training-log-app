FactoryBot.define do
  factory :user do
    name { "Example User" }
    email { "user@example.com" }
    password { "password" }
    password_digest { "password" }
  end
end
