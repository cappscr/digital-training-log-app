require 'rails_helper'

RSpec.describe TrainingSessionWeather, type: :model do
  describe "valid record" do
    it "is valid with valid attributes" do
      weather = build(:training_session_weather)
      expect(weather).to be_valid
    end

    it "can be persisted" do
      weather = create(:training_session_weather)
      expect(weather).to be_persisted
      expect(weather.training_session).to be_present
    end
  end

  describe "associations" do
    it "belongs to a training session" do
      association = described_class.reflect_on_association(:training_session)
      expect(association.macro).to eq(:belongs_to)
    end
  end

  describe "weather attributes" do
    it "stores temperature, humidity, and conditions" do
      weather = build(:training_session_weather)
      expect(weather.temperature).to eq(70.0)
      expect(weather.humidity).to eq(50.0)
      expect(weather.conditions).to eq("sunny")
    end
  end

  describe "dependent destroy" do
    it "is destroyed when its training session is destroyed" do
      training_session = create(:training_session)
      weather = create(:training_session_weather, training_session: training_session)

      expect { training_session.destroy }.to change(described_class, :count).by(-1)
      expect(described_class.exists?(weather.id)).to be false
    end
  end
end
