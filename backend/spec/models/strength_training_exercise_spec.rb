require 'rails_helper'

RSpec.describe StrengthTrainingExercise, type: :model do
  describe "validations" do
    it "is invalid without a name" do
      strength_training_exercise = build(:strength_training_exercise, name: nil)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:name]).to include("can't be blank")
    end

    it "is invalid with a name longer than 100 characters" do
      strength_training_exercise = build(:strength_training_exercise, name: "a" * 101)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:name]).to include("is too long (maximum is 100 characters)")
    end

    it "is invalid with sets less than 1" do
      strength_training_exercise = build(:strength_training_exercise, sets: 0)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:sets]).to include("must be greater than 0")
    end

    it "is invalid with reps less than 1" do
      strength_training_exercise = build(:strength_training_exercise, reps: 0)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:reps]).to include("must be greater than 0")
    end

    it "is invalid with weight less than 0" do
      strength_training_exercise = build(:strength_training_exercise, weight: -1, weight_units: "lbs")
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:weight]).to include("must be greater than 0")
    end

    it "is invalid with weight but no weight units" do
      strength_training_exercise = build(:strength_training_exercise, weight: 100, weight_units: nil)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:weight_units]).to include("can't be blank")
    end

    it "is invalid with position less than 1" do
      strength_training_exercise = build(:strength_training_exercise, position: 0)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:position]).to include("must be greater than 0")
    end

    it "is invalid with both weight and bodyweight" do
      strength_training_exercise = build(:strength_training_exercise, weight: 100, weight_units: "lbs", bodyweight: true)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:base]).to include("Cannot have both weight and bodyweight")
    end

    it "is invalid without weight or bodyweight" do
      strength_training_exercise = build(:strength_training_exercise, weight: nil, weight_units: nil, bodyweight: false)
      expect(strength_training_exercise).to be_invalid
      expect(strength_training_exercise.errors[:base]).to include("Either weight or bodyweight must be present")
    end
  end

  describe "valid record" do
    it "is valid with valid attributes" do
      strength_training_exercise = build(:strength_training_exercise)
      expect(strength_training_exercise).to be_valid
    end

    it "can be persisted" do
      strength_training_exercise = create(:strength_training_exercise)
      expect(strength_training_exercise).to be_persisted
      expect(strength_training_exercise.session).to be_present
    end

    it "cannot persist without a name" do
      exercise = build(:strength_training_exercise, name: nil)
      expect { exercise.save!(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
    end
  end

  describe "weight units" do
    it "defaults to lbs" do
      strength_training_exercise = build(:strength_training_exercise)
      expect(strength_training_exercise.weight_in_lbs?).to be true
    end

    it "can be kg" do
      strength_training_exercise = build(:strength_training_exercise, :weight_in_kg)
      expect(strength_training_exercise.weight_in_kg?).to be true
    end
  end

  describe "bodyweight" do
    it "defaults to false" do
      strength_training_exercise = build(:strength_training_exercise)
      expect(strength_training_exercise.bodyweight?).to be false
    end

    it "can be true" do
      strength_training_exercise = build(:strength_training_exercise, :bodyweight)
      expect(strength_training_exercise.bodyweight?).to be true
      expect(strength_training_exercise.weight).to be nil
      expect(strength_training_exercise.weight_units).to be nil
    end
  end

  describe "associations" do
    it "belongs to a strength training session" do
      association = described_class.reflect_on_association(:session)
      expect(association.macro).to eq(:belongs_to)
      expect(association.options[:inverse_of]).to eq(:exercises)
      expect(association.class_name).to eq("StrengthTrainingSession")
    end

    it "is destroyed when the strength training session is destroyed" do
      strength_training_session = create(:strength_training_session)
      strength_training_exercise = create(:strength_training_exercise, session: strength_training_session)
      expect { strength_training_session.destroy }.to change(StrengthTrainingExercise, :count).by(-2)
      expect(StrengthTrainingExercise.exists?(strength_training_exercise.id)).to be false
    end
  end
end
