require 'rails_helper'

RSpec.describe CrossTrainingSession, type: :model do
  describe "valid record" do
    it "is valid with valid attributes" do
      cross_training_session = build(:cross_training_session)
      expect(cross_training_session).to be_valid
    end

    it "can be persisted" do
      cross_training_session = create(:training_session, :cross_training)
      expect(cross_training_session.sport_details).to be_a(CrossTrainingSession)
      expect(cross_training_session.sport_details).to be_persisted
      expect(cross_training_session.user).to be_present
    end
  end

  describe "associations" do
    it "has one training session as sport details" do
      association = described_class.reflect_on_association(:training_session)
      expect(association.macro).to eq(:has_one)
      expect(association.options[:as]).to eq(:sport_details)
    end

    it "is destroyed when the training session is destroyed" do
      training_session = create(:training_session, :cross_training)
      cross_training_session = training_session.sport_details
      expect { training_session.destroy }.to change(CrossTrainingSession, :count).by(-1)
      expect(CrossTrainingSession.exists?(cross_training_session.id)).to be false
    end
  end

  describe "validations" do
    it "is invalid without an activity" do
      cross_training_session = build(:cross_training_session, activity: nil)
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with an activity longer than 100 characters" do
      cross_training_session = build(:cross_training_session, activity: "a" * 101)
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with a whitespace only activity" do
      cross_training_session = build(:cross_training_session, activity: "  ")
      expect(cross_training_session).not_to be_valid
    end

    it "is valid without elevation_gain" do
      cross_training_session = build(:cross_training_session, elevation_gain: nil)
      expect(cross_training_session).to be_valid
    end

    it "is invalid with an elevation_gain less than 0" do
      cross_training_session = build(:cross_training_session, elevation_gain: -1)
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with invalid elevation_unit" do
      cross_training_session = build(:cross_training_session, elevation_unit: "invalid")
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with elevation_gain but no elevation_unit" do
      cross_training_session = build(:cross_training_session, elevation_gain: 100, elevation_unit: nil)
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with an average_heart_rate less than or equal to 0" do
      cross_training_session = build(:cross_training_session, average_heart_rate: 0)
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with a distance less than or equal to 0" do
      cross_training_session = build(:cross_training_session, distance: 0)
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with a distance but no distance_unit" do
      cross_training_session = build(:cross_training_session, distance: 10, distance_unit: nil)
      expect(cross_training_session).not_to be_valid
    end

    it "is invalid with invalid distance_unit" do
      cross_training_session = build(:cross_training_session, distance_unit: "invalid")
      expect(cross_training_session).not_to be_valid
    end

    it "is valid with duration and no distance" do
      cross_training = build(:cross_training_session, :minimal)
      cross_training.build_training_session(duration_seconds: 1000, user: build(:user))
      expect(cross_training).to be_valid
    end

    it "is invalid without a distance or duration" do
      cross_training = build(:cross_training_session, distance: nil)
      training_session = build(:training_session, duration_seconds: nil, sport_details: cross_training)
      expect(cross_training).not_to be_valid
      expect(cross_training.errors.full_messages).to include("Duration and distance can't both be blank")
    end
  end

  describe "normalizations" do
    it "normalizes activity" do
      cross_training_session = build(:cross_training_session, activity: "  test  ")
      expect(cross_training_session.activity).to eq("test")
    end
  end
end
