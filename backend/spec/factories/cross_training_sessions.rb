FactoryBot.define do
  factory :cross_training_session do
    average_heart_rate { 130 }
    distance { "2.00" }
    elevation_gain { 1300 }
    activity { "Uphill Treadmill" }

    trait :minimal do
      average_heart_rate { nil }
      distance { nil }
      elevation_gain { nil }
      activity { "Aqua Jogging" }
    end
  end
end
