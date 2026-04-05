# spec/models/pace_spec.rb
require 'rails_helper'

RSpec.describe Pace, type: :model do
  # We use a hash here to match the new initialize method
  let(:valid_attributes) do
    { minutes: 6, seconds: 18, units: :per_mile }
  end

  subject { Pace.new(valid_attributes) }

  describe "initialization" do
    it "sets attributes via a hash" do
      pace = Pace.new(minutes: 7, seconds: 18, units: :per_km)
      expect(pace.minutes).to eq(7)
      expect(pace.seconds).to eq(18)
      expect(pace.units).to eq(:per_km)
    end

    it "converts string units to symbols" do
      pace = Pace.new(units: "per_mile")
      expect(pace.units).to eq(:per_mile)
    end
  end

  describe "validations" do
    it "is valid with minutes over 60 (ultra pace!)" do
      subject.minutes = 75
      expect(subject).to be_valid
    end

    it "is invalid if seconds are 60" do
      subject.seconds = 60
      expect(subject).not_to be_valid
      expect(subject.errors[:seconds]).to include("must be less than 60")
    end

    it "is invalid with a nonsense unit" do
      subject.units = :fast_as_lightning
      expect(subject).not_to be_valid
    end
  end

  describe "#to_s" do
    it "formats single digit seconds with a leading zero" do
      pace = Pace.new(minutes: 7, seconds: 5, units: :per_mile)
      expect(pace.to_s).to eq("7:05")
    end

    it "includes units when the include_units flag is passed" do
      pace = Pace.new(minutes: 7, seconds: 5, units: :per_mile)
      expect(pace.to_s(include_units: true)).to eq("7:05 / mi")
    end

    it "returns an empty string when invalid" do
      subject.units = nil
      expect(subject.to_s).to eq("")
    end
  end

  describe "#percentage" do
    it "returns a slower pace for a percentage under 100" do
      expect(subject.percentage(80).to_s(include_units: true)).to eq("7:34 / mi")
    end

    it "returns a faster pace for a percentage over 100" do
      expect(subject.percentage(110).to_s(include_units: true)).to eq("5:40 / mi")
    end

    it "returns nil if the record is invalid" do
      subject.minutes = -5
      expect(subject.percentage(10)).to be_nil
    end
  end
end
