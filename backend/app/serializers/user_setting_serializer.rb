class UserSettingSerializer < ActiveModel::Serializer
  attributes :default_distance_unit, :default_weight_unit, :default_elevation_unit, :microcycle_start_day, :theme
end