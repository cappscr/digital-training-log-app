FactoryBot.define do
  factory :user_setting do
    association :user
    default_distance_unit { "mi" }
    default_weight_unit { "lbs" }
    default_elevation_unit { "ft" }
    microcycle_start_day { "monday" }
    theme { "dark" }
  end

  trait :km_default_distance_unit do
    default_distance_unit { "km" }
  end

  trait :kg_default_weight_unit do
    default_weight_unit { "kg" }
  end

  trait :m_default_elevation_unit do
    default_elevation_unit { "m" }
  end

  trait :sunday_microcycle_start_day do
    microcycle_start_day { "sunday" }
  end

  trait :light_theme do
    theme { "light" }
  end

  trait :system_theme do
    theme { "system" }
  end
end