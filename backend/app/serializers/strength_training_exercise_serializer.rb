class StrengthTrainingExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :sets, :reps, :weight, :weight_units, :bodyweight, :position

  def weight
    object.weight&.to_f
  end
end