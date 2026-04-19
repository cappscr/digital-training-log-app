class PaceCalculationSerializer < ActiveModel::Serializer
  attributes :percentage, :original_pace, :calculated_pace, :units
end