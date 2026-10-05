FactoryBot.define do
  factory :strength_training_session do
    after(:build) do |session|
      next if session.exercises.any?

      session.exercises << build(:strength_training_exercise, session: session)
    end

    trait :with_average_heart_rate do
      average_heart_rate { 130 }
    end
  end
end
