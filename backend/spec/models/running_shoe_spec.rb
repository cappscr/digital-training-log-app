require 'rails_helper'

RSpec.describe RunningShoe, type: :model do
  it "is valid with valid attributes" do
    shoes = build(:running_shoe)
    expect(shoes).to be_valid
  end

  describe "validations" do
    it "requires a brand" do
      shoes = build(:running_shoe, brand: "   ")
      expect(shoes).not_to be_valid
    end

    it "rejects a brand longer than 100 characters" do
      shoes = build(:running_shoe, brand: "a" * 101)
      expect(shoes).not_to be_valid
    end

    it "requires a model" do
      shoes = build(:running_shoe, model: "   ")
      expect(shoes).not_to be_valid
    end

    it "rejects a model longer than 100 characters" do
      shoes = build(:running_shoe, model: "a" * 101)
      expect(shoes).not_to be_valid
    end

    it "rejects a nickname longer than 100 characters" do
      shoes = build(:running_shoe, nickname: "a" * 101)
      expect(shoes).not_to be_valid
    end

    it "rejects a date retired before the date first used" do
      shoes = build(:running_shoe, date_first_used: Date.today, date_retired: Date.yesterday)
      expect(shoes).not_to be_valid
    end

    it "rejects a date first used in the future" do
      shoes = build(:running_shoe, date_first_used: Date.tomorrow)
      expect(shoes).not_to be_valid
    end

    it "rejects a date retired in the future" do
      shoes = build(:running_shoe, date_retired: Date.tomorrow)
      expect(shoes).not_to be_valid
    end
  end

  describe "scopes" do
    it "returns active shoes" do
      shoes = create(:running_shoe)
      expect(RunningShoe.active).to include(shoes)
    end

    it "returns retired shoes" do
      shoes = create(:running_shoe, :retired)
      expect(RunningShoe.retired).to include(shoes)
    end
  end

  describe "before_save" do
    it "trims the brand, model, and nickname" do
      shoes = create(:running_shoe, brand: "   ASICS   ", model: "   NovaBlast   ", nickname: "   Black/Black   ")
      expect(shoes.brand).to eq("ASICS")
      expect(shoes.model).to eq("NovaBlast")
      expect(shoes.nickname).to eq("Black/Black")
    end

    it "nullifies a blank nickname" do
      shoes =  create(:running_shoe, nickname: "   ")
      expect(shoes.nickname).to be_nil
    end
  end
end
