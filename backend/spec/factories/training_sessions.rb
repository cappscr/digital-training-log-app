FactoryBot.define do
  factory :training_session do
    user
    duration_seconds { 1800 }
    notes { "Felt strong through the middle miles." }
    location_type { "outdoor" }

    association :sport_details, factory: :running_training_session

    trait :indoor do
      location_type { "indoor" }
    end
  end
end
