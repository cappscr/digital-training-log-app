class StrengthTrainingExercise < ApplicationRecord
  belongs_to :session,
             class_name: "StrengthTrainingSession",
             foreign_key: :strength_training_session_id,
             inverse_of: :exercises

  enum :weight_unit, {
    lbs: "lbs",
    kg: "kg"
  }, validate: { allow_nil: true }, prefix: :weight_in

  normalizes :name, with: ->(value) { value&.strip }

  validates :name, presence: true, length: { maximum: 100 }
  validates :sets, numericality: { only_integer: true, greater_than: 0 }
  validates :reps, numericality: { only_integer: true, greater_than: 0 }
  validates :weight, numericality: { greater_than: 0 }, allow_nil: true
  validates :weight, presence: true, if: -> { weight_unit.present? }
  validates :weight_unit, presence: true, if: -> { weight.present? }
  validates :bodyweight, inclusion: { in: [true, false] }
  validates :position, numericality: { only_integer: true, greater_than: 0 }
  validate :has_weight_or_bodyweight?
  validate :does_not_have_weight_and_bodyweight?

  private

  def has_weight_or_bodyweight?
    return if weight.present? && weight_unit.present? || bodyweight

    errors.add(:base, "Either weight or bodyweight must be present")
  end

  def does_not_have_weight_and_bodyweight?
    errors.add(:base, "Cannot have both weight and bodyweight") if weight.present? && bodyweight
  end
end
