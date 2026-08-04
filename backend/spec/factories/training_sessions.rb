FactoryBot.define do
  factory :training_session do
    user
    sport_session { nil }
    duration { 1800 }
    notes { "Felt strong through the middle miles." }
    location_type { "outdoor" }

    association :sport_session, factory: :running_training_session

    trait :indoor do
      location_type { "indoor" }
    end
  end
end
