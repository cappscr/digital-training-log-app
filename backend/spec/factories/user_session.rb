# spec/factories/user_sessions.rb
FactoryBot.define do
  factory :user_session do
    association :user
    token_digest { BCrypt::Password.create(SecureRandom.urlsafe_base64) }
    remember_me { false }
    last_used_at { Time.current }
    expires_at { 2.weeks.from_now }
  end
end