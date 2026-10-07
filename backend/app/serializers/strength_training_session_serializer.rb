class StrengthTrainingSessionSerializer < ActiveModel::Serializer
  attributes :id, :average_heart_rate, :volume_load, :volume_load_units

  def volume_load
    object.volume_load&.to_f
  end

  def volume_load_units
    object.volume_load_units
  end

  has_many :exercises, serializer: StrengthTrainingExerciseSerializer
end