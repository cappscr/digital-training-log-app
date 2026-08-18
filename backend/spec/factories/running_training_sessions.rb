FactoryBot.define do
  factory :running_training_session do
    distance { 8.0 }
    elevation_gain { 100 }
    average_heart_rate { 130 }
    average_cadence { 180 }

    trait :workout do
      after(:create) do |running_training_session|
        create(:running_training_session_type, running_training_session: running_training_session)
      end
    end

    trait :race do
      after(:create) do |running_training_session|
        create(:running_training_session_type, :race, running_training_session: running_training_session)
      end
    end

    trait :long_run do
      after(:create) do |running_training_session|
        create(:running_training_session_type, :long_run, running_training_session: running_training_session)
      end
    end

    trait :strides do
      after(:create) do |running_training_session|
        create(:running_training_session_tag, running_training_session: running_training_session)
      end
    end

    trait :treadmill do
      after(:create) do |running_training_session|
        create(:running_training_session_tag, :treadmill, running_training_session: running_training_session)
      end
    end

    trait :run_club do
      after(:create) do |running_training_session|
        create(:running_training_session_tag, :run_club, running_training_session: running_training_session)
      end
    end

    trait :cross_training do
      after(:create) do |running_training_session|
        create(:running_training_session_tag, :cross_training, running_training_session: running_training_session)
      end
    end
  end
end
