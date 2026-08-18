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
end
