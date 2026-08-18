require 'rails_helper'

RSpec.describe RunningTrainingSessionType, type: :model do
  describe "valid record" do
    it "is valid with valid attributes" do
      type = build(:running_training_session_type)
      expect(type).to be_valid
    end

    it "can be persisted" do
      type = create(:running_training_session_type)
      expect(type).to be_persisted
      expect(type.running_training_session).to be_present
    end
  end

  describe "associations" do
    it "belongs to a running training session" do
      association = described_class.reflect_on_association(:running_training_session)
      expect(association.macro).to eq(:belongs_to)
    end
  end

  describe "kind enum" do
    it "defines the expected type kinds" do
      expect(described_class.kinds.keys).to contain_exactly(
        "workout",
        "race",
        "long_run"
      )
    end

    it "defaults to workout from the factory" do
      type = build(:running_training_session_type)
      expect(type.workout?).to be true
    end
  end

  describe "dependent destroy" do
    it "is destroyed when its running training session is destroyed" do
      running_session = create(:running_training_session, :race)
      type = running_session.running_training_session_types.first

      expect { running_session.destroy }.to change(described_class, :count).by(-1)
      expect(described_class.exists?(type.id)).to be false
    end
  end
end
