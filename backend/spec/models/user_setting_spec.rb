require 'rails_helper'

RSpec.describe UserSetting, type: :model do
  describe "validations" do
    it "is invalid without a user" do
      user_setting = build(:user_setting, user: nil)
      expect(user_setting).not_to be_valid
    end

    describe "default distance unit" do
      it "is invalid with an invalid default distance unit" do
        user_setting = build(:user_setting, default_distance_unit: "yd")
        expect(user_setting).not_to be_valid
      end

      it "is invalid without a default distance unit" do
        user_setting = build(:user_setting, default_distance_unit: nil)
        expect(user_setting).not_to be_valid
      end
    end

    describe "default weight unit" do
      it "is invalid with an invalid default weight unit" do
        user_setting = build(:user_setting, default_weight_unit: "g")
        expect(user_setting).not_to be_valid
      end

      it "is invalid without a default weight unit" do
        user_setting = build(:user_setting, default_weight_unit: nil)
        expect(user_setting).not_to be_valid
      end
    end

    describe "default elevation unit" do
      it "is invalid with an invalid default elevation unit" do
        user_setting = build(:user_setting, default_elevation_unit: "in")
        expect(user_setting).not_to be_valid
      end

      it "is invalid without a default elevation unit" do
        user_setting = build(:user_setting, default_elevation_unit: nil)
        expect(user_setting).not_to be_valid
      end
    end

    describe "microcycle start day" do
      it "is invalid with an invalid microcycle start day" do
        user_setting = build(:user_setting, microcycle_start_day: "saturday")
        expect(user_setting).not_to be_valid
      end

      it "is invalid without a microcycle start day" do
        user_setting = build(:user_setting, microcycle_start_day: nil)
        expect(user_setting).not_to be_valid
      end
    end

    describe "theme" do
      it "is invalid with an invalid theme" do
        user_setting = build(:user_setting, theme: "invalid")
        expect(user_setting).not_to be_valid
      end

      it "is invalid without a theme" do
        user_setting = build(:user_setting, theme: nil)
        expect(user_setting).not_to be_valid
      end
    end
  end

  it "is valid with valid attributes" do
    user_setting = build(:user_setting)
    expect(user_setting).to be_valid
  end
end
