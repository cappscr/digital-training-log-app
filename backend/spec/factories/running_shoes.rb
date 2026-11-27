FactoryBot.define do
  factory :running_shoe do
    association :user

    brand { "ASICS" }
    model { "NovaBlast" }

    trait :in_use do
      date_first_used { 1.year.ago.to_date }
    end

    trait :retired do
      date_first_used { 1.year.ago.to_date }
      date_retired { Date.today }
    end

    trait :with_nickname do
      nickname { "Black/Black" }
    end
  end
end
