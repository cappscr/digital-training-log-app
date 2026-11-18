class TrainingSessionWeatherSerializer < ActiveModel::Serializer
  attributes :id, :temperature, :temperature_unit, :humidity, :conditions
end
