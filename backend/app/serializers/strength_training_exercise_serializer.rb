class StrengthTrainingExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :sets, :reps, :weight, :weight_unit, :bodyweight, :position

  def weight
    object.weight&.to_f
  end
end