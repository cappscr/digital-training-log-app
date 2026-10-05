require 'rails_helper'

RSpec.describe StrengthTrainingSession, type: :model do
  describe "validations" do
    it "is invalid with an average heart rate less than 1" do
      strength_training_session = build(:strength_training_session, average_heart_rate: 0)
      expect(strength_training_session).to be_invalid
      expect(strength_training_session.errors[:average_heart_rate]).to include("must be greater than 0")
    end

    it "is invalid with exercises that are invalid" do
      strength_training_session = build(:strength_training_session)
      strength_training_session.exercises = [
        build(:strength_training_exercise, session: strength_training_session, name: nil),
      ]
      expect(strength_training_session).to be_invalid
      expect(strength_training_session.errors[:"exercises/0/name"]).to include("can't be blank")
    end
  end

  describe "valid record" do
    it "is valid with valid attributes" do
      strength_training_session = build(:strength_training_session)
      expect(strength_training_session).to be_valid
    end

    it "can be persisted" do
      strength_training_session = create(:training_session, :strength_training)
      expect(strength_training_session.sport_details).to be_a(StrengthTrainingSession)
      expect(strength_training_session.sport_details).to be_persisted
      expect(strength_training_session.user).to be_present
    end
  end

  describe "associations" do
    it "has one training session as sport details" do
      association = described_class.reflect_on_association(:training_session)
      expect(association.macro).to eq(:has_one)
      expect(association.options[:as]).to eq(:sport_details)
    end

    it "is destroyed when the training session is destroyed" do
      training_session = create(:training_session, :strength_training)
      strength_training_session = training_session.sport_details
      expect { training_session.destroy }.to change(StrengthTrainingSession, :count).by(-1)
      expect(StrengthTrainingSession.exists?(strength_training_session.id)).to be false
    end
  end

  describe "exercises" do
    it "has many exercises" do
      association = described_class.reflect_on_association(:exercises)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end
  end
end
