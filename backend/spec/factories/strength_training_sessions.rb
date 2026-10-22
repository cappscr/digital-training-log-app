FactoryBot.define do
  factory :strength_training_session do
    transient do
      with_exercises { true }
    end

    after(:build) do |session, evaluator|
      next unless evaluator.with_exercises
      next if session.exercises.any?

      session.exercises << build(:strength_training_exercise, session: session)
    end

    trait :with_average_heart_rate do
      average_heart_rate { 130 }
    end

    trait :mixed_weight_units do
      exercises { [
        build(:strength_training_exercise, weight_unit: "lbs"),
        build(:strength_training_exercise, weight_unit: "kg")
      ] }
    end
  end
end
