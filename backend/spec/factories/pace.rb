FactoryBot.define do
  factory :pace do
    minutes { 6 }
    seconds { 18 }
    units { :per_mile }

    trait :per_km do
      units { :per_km }
    end
  end
end
