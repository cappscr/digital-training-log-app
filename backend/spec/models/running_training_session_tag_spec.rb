require 'rails_helper'

RSpec.describe RunningTrainingSessionTag, type: :model do
  describe "valid record" do
    it "is valid with valid attributes" do
      tag = build(:running_training_session_tag)
      expect(tag).to be_valid
    end

    it "can be persisted" do
      tag = create(:running_training_session_tag)
      expect(tag).to be_persisted
      expect(tag.running_training_session).to be_present
    end
  end

  describe "associations" do
    it "belongs to a running training session" do
      association = described_class.reflect_on_association(:running_training_session)
      expect(association.macro).to eq(:belongs_to)
    end
  end

  describe "kind enum" do
    it "defines the expected tag kinds" do
      expect(described_class.kinds.keys).to contain_exactly(
        "strides",
        "treadmill",
        "run_club",
        "cross_training"
      )
    end

    it "defaults to strides from the factory" do
      tag = build(:running_training_session_tag)
      expect(tag.strides?).to be true
    end
  end

  describe "dependent destroy" do
    it "is destroyed when its running training session is destroyed" do
      running_session = create(:running_training_session, :treadmill)
      tag = running_session.running_training_session_tags.first

      expect { running_session.destroy }.to change(described_class, :count).by(-1)
      expect(described_class.exists?(tag.id)).to be false
    end
  end
end
