require 'rails_helper'

RSpec.describe TrainingSession, type: :model do
  describe "valid record" do
    it "is valid with valid attributes" do
      training_session = build(:training_session)
      expect(training_session).to be_valid
    end

    it "can be persisted" do
      training_session = create(:training_session)
      expect(training_session).to be_persisted
      expect(training_session.user).to be_present
      expect(training_session.sport_details).to be_a(RunningTrainingSession)
    end
  end

  describe "associations" do
    it "belongs to a user" do
      association = described_class.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end

    it "belongs to a polymorphic sport details record" do
      association = described_class.reflect_on_association(:sport_details)
      expect(association.macro).to eq(:belongs_to)
      expect(association.options[:polymorphic]).to be true
    end
  end

  describe "delegated types" do
    it "supports the expected sport details types" do
      expect(described_class.sport_details_types).to contain_exactly(
        "RunningTrainingSession",
        "CrossTrainingSession",
        "StrengthTrainingSession",
        "SupplementaryTrainingSession"
      )
    end

    it "destroys the sport details record when the training session is destroyed" do
      training_session = create(:training_session)
      sport_details = training_session.sport_details

      expect { training_session.destroy }.to change(RunningTrainingSession, :count).by(-1)
      expect(RunningTrainingSession.exists?(sport_details.id)).to be false
    end
  end

  describe "location_type" do
    it "defines outdoor and indoor values" do
      expect(described_class.location_types.keys).to contain_exactly("outdoor", "indoor")
    end

    it "defaults to outdoor" do
      training_session = build(:training_session)
      expect(training_session.outdoor?).to be true
    end

    it "can be set to indoor" do
      training_session = build(:training_session, :indoor)
      expect(training_session.indoor?).to be true
    end
  end

  describe "validations" do
    it "validates the duration_seconds" do
      training_session = build(:training_session, duration_seconds: -1)
      expect(training_session).not_to be_valid
      expect(training_session.errors.full_messages).to include("Duration seconds must be greater than 0")
    end

    it "validates the duration_seconds is an integer" do
      training_session = build(:training_session, duration_seconds: 1.5)
      expect(training_session).not_to be_valid
      expect(training_session.errors.full_messages).to include("Duration seconds must be an integer")
    end
  end
end
