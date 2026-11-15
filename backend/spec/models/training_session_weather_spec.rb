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
    it "stores temperature, temperature unit, humidity, and conditions" do
      weather = build(:training_session_weather)
      expect(weather.temperature).to eq(70.0)
      expect(weather.temperature_unit).to eq("f")
      expect(weather.humidity).to eq(50)
      expect(weather.conditions).to eq("Sunny")
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

  describe "validations" do
    it "both temperature and temperature unit can be nil" do
      weather = build(:training_session_weather, temperature: nil, temperature_unit: nil)
      expect(weather).to be_valid
    end

    it "validates temperature unit is f or c" do
      weather = build(:training_session_weather, temperature_unit: "x")
      expect(weather).not_to be_valid
      expect(weather.errors[:temperature_unit]).to include("is not included in the list")
    end

    it "validates temperature is a number" do
      weather = build(:training_session_weather, temperature: "x")
      expect(weather).not_to be_valid
      expect(weather.errors[:temperature]).to include("is not a number")
    end

    it "0 and negative temperatures are valid" do
      zero_degrees = build(:training_session_weather, temperature: 0)
      expect(zero_degrees).to be_valid
      negative_degrees = build(:training_session_weather, temperature: -1)
      expect(negative_degrees).to be_valid
    end

    it "validates temperature has at most one decimal place" do
      weather = build(:training_session_weather, temperature: "100.12")
      expect(weather).not_to be_valid
      expect(weather.errors[:temperature]).to include("must have at most one decimal place")
    end

    it "validates temperature unit when temperature is present" do
      weather = build(:training_session_weather, temperature_unit: nil)
      expect(weather).not_to be_valid
      expect(weather.errors[:temperature_unit]).to include("can't be blank")
    end

    it "validates temperature when temperature unit is present" do
      weather = build(:training_session_weather, temperature: nil)
      expect(weather).not_to be_valid
      expect(weather.errors[:temperature]).to include("can't be blank")
    end

    it "validates humidity is an integer between 0 and 100" do
      negative_humidity = build(:training_session_weather, humidity: -1)
      zero_humidity = build(:training_session_weather, humidity: 0)
      one_hundred_humidity = build(:training_session_weather, humidity: 100)
      over_100_humidity = build(:training_session_weather, humidity: 101)
      expect(negative_humidity).not_to be_valid
      expect(zero_humidity).to be_valid
      expect(one_hundred_humidity).to be_valid
      expect(over_100_humidity).not_to be_valid
    end

    it "validates humidity is an integer" do
      non_numerical_humidity = build(:training_session_weather, humidity: "x")
      fractional_humidity = build(:training_session_weather, humidity: 100.5)
      expect(non_numerical_humidity).not_to be_valid
      expect(non_numerical_humidity.errors[:humidity]).to include("is not a number")
      expect(fractional_humidity).not_to be_valid
      expect(fractional_humidity.errors[:humidity]).to include("must be an integer")
    end
  end

  describe "before save" do
    it "trims conditions" do
      weather = create(:training_session_weather, conditions: "   Sunny   ")
      expect(weather.conditions).to eq("Sunny")
    end
  end
end
