class StrengthTrainingSessionSerializer < ActiveModel::Serializer
  attributes :id, :average_heart_rate, :volume_load, :volume_load_unit

  def volume_load
    object.volume_load&.to_f
  end

  def volume_load_unit
    object.volume_load_unit
  end

  has_many :exercises, serializer: StrengthTrainingExerciseSerializer
end