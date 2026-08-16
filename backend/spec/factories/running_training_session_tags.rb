FactoryBot.define do
  factory :running_training_session_tag do
    association :running_training_session, factory: :running_training_session
    kind { "strides" }

    trait :treadmill do
      kind { "treadmill" }
    end

    trait :run_club do
      kind { "run_club" }
    end

    trait :cross_training do
      kind { "cross_training" }
    end
  end
end
