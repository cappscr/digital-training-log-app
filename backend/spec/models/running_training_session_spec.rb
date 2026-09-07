require 'rails_helper'

RSpec.describe RunningTrainingSession, type: :model do
  describe "valid record" do
    it "is valid with valid attributes" do
      running_training_session = build(:running_training_session)
      expect(running_training_session).to be_valid
    end

    it "is valid with valid attributes and duration_seconds" do
      running = build(:running_training_session, distance: nil)
      running.build_training_session(duration_seconds: 1000, user: build(:user))

      expect(running).to be_valid
    end
  end

  describe "validations" do
    it "validates the distance" do
      running_training_session = build(:running_training_session, distance: -1)
      expect(running_training_session).not_to be_valid
      expect(running_training_session.errors.full_messages).to include("Distance must be greater than 0")
    end

    it "validates the distance_unit" do
      running_training_session = build(:running_training_session, distance_unit: 'invalid')
      expect(running_training_session).not_to be_valid
      expect(running_training_session.errors.full_messages).to include("Distance unit is not included in the list")
    end

    it "validates the distance_unit is present if the distance is present" do
      running_training_session = build(:running_training_session, distance: 10, distance_unit: nil)
      expect(running_training_session).not_to be_valid
      expect(running_training_session.errors.full_messages).to include("Distance unit can't be blank")
    end
  end

  it "validates the elevation_gain" do
    running_training_session = build(:running_training_session, elevation_gain: -1)
    expect(running_training_session).not_to be_valid
    expect(running_training_session.errors.full_messages).to include("Elevation gain must be greater than or equal to 0")
  end

  it "validates the average_cadence" do
    running_training_session = build(:running_training_session, average_cadence: -1)
    expect(running_training_session).not_to be_valid
    expect(running_training_session.errors.full_messages).to include("Average cadence must be greater than or equal to 0")
  end

  it "validates the average_heart_rate" do
    running_training_session = build(:running_training_session, average_heart_rate: -1)
    expect(running_training_session).not_to be_valid
    expect(running_training_session.errors.full_messages).to include("Average heart rate must be greater than or equal to 0")
  end

  it "validates the duration_seconds or distance is present" do
    running = build(:running_training_session, distance: nil)
    training_session = build(:training_session, duration_seconds: nil, sport_details: running)
    expect(running).not_to be_valid
    expect(running.errors.full_messages).to include("Duration and distance can't both be blank")
  end
end
