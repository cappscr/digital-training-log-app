FactoryBot.define do
  factory :training_session do
    user
    duration_seconds { 1800 }
    notes { "Felt strong through the middle miles." }
    location_type { "outdoor" }
    session_date { Date.today }

    association :sport_details, factory: :running_training_session

    trait :strength_training do
      association :sport_details, factory: :strength_training_session
      location_type { "indoor" }
    end

    trait :cross_training do
      association :sport_details, factory: :cross_training_session
    end

    trait :indoor do
      location_type { "indoor" }
    end

    trait :with_time do
      session_time { Time.now.strftime("%H:%M:%S") }
    end
  end
end
