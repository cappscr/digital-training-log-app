class PaceCalculation
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_accessor :percentage, :original_pace, :calculated_pace, :units
end
