FactoryBot.define do
  factory :strength_training_exercise do
    association :session, factory: :strength_training_session, with_exercises: false
    name { "squats" }
    sets { 1 }
    reps { 6 }
    weight { 100 }
    weight_units { "lbs" }
    bodyweight { false }
    position { 1 }

    trait :multiple_sets do
      sets { 3 }
    end

    trait :weight_in_kg do
      weight_units { "kg" }
    end

    trait :bodyweight do
      bodyweight { true }
      weight { nil }
      weight_units { nil }
    end
  end
end
