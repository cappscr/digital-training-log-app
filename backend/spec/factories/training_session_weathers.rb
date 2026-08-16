FactoryBot.define do
  factory :training_session_weather do
    association :training_session, factory: :training_session
    temperature { "70.0" }
    humidity { "50.0" }
    conditions { "sunny" }
  end
end
