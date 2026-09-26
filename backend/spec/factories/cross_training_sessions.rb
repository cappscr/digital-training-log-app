FactoryBot.define do
  factory :cross_training_session do
    average_heart_rate { 130 }
    distance { "2.00" }
    distance_unit { "mi" }
    elevation_gain { 1300 }
    elevation_unit { "ft" }
    activity { "Uphill Treadmill" }

    trait :minimal do
      average_heart_rate { nil }
      distance { nil }
      elevation_gain { nil }
      activity { "Aqua Jogging" }
    end

    trait :metric_units do
      distance_unit { "km" }
      elevation_unit { "m" }
    end
  end
end
