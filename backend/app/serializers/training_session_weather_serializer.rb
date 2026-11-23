class TrainingSessionWeatherSerializer < ActiveModel::Serializer
  attributes :id, :temperature, :temperature_unit, :humidity, :conditions

  def temperature
    object.temperature.to_f
  end
end
