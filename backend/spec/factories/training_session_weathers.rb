FactoryBot.define do
  factory :training_session_weather do
    association :training_session, factory: :training_session
    temperature { "70.0" }
    temperature_unit { "f" }
    humidity { "50" }
    conditions { "Sunny" }
  end

  trait :in_celsius do
    temperature_unit { "c" }
    temperature { "21.1" }
  end

  trait :rainy do
    conditions { "Rainy" }
  end

  trait :cloudy do
    conditions { "Cloudy" }
  end

  trait :snowy do
    conditions { "Snowy" }
  end

  trait :windy do
    conditions { "Windy" }
  end

  trait :foggy do
    conditions { "Foggy" }
  end
end
