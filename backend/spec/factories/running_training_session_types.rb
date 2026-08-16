FactoryBot.define do
  factory :running_training_session_type do
    association :running_training_session, factory: :running_training_session
    kind { "workout" }

    trait :race do
      kind { "race" }
    end

    trait :long_run do
      kind { "long_run" }
    end
  end
end
