require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with valid attributes" do
    user = build(:user)
    expect(user).to be_valid
  end

  describe "validations" do
    it "requires a name" do
      user = build(:user, name: "   ")
      expect(user).not_to be_valid
    end

    it "requires an email" do
      user = build(:user, email: "   ")
      expect(user).not_to be_valid
    end

    it "requires name to be under 51 characters" do
      user = build(:user, name: "a" * 51)
      expect(user).not_to be_valid
    end

    it "requires email to be under 256 characters" do
      user = build(:user, email: "a" * 244 + "@example.com")
      expect(user).not_to be_valid
    end

    it "requires a unique email address" do
      user = build(:user)
      duplicate_user = user.dup
      user.save
      expect(duplicate_user).not_to be_valid
    end

    it "requires a password to be present (nonblank)" do
      user = build(:user, password: " " * 8, password_confirmation: " " * 8)
      expect(user).not_to be_valid
    end

    it "requires a minimum password length" do
      user = build(:user, password: "a" * 7, password_confirmation: "a" * 7)
      expect(user).not_to be_valid
    end
  end

  describe "email format" do
    it "accepts valid addresses" do
      valid_addresses = [
        'user@example.com',
        'USER@foo.COM',
        'A_US-ER@foo.bar.org',
        'first.last@foo.jp',
        'alice+bob@baz.cn'
      ]
      valid_addresses.each do |valid_address|
        user = build(:user, email: valid_address)
        expect(user).to be_valid, "#{valid_address.inspect} should be valid"
      end
    end

    it "rejects invalid addresses" do
      invalid_addresses = [
        "user@example,com",
        "user_at_foo.org",
        "user.name@example.",
        "foo@bar_baz.com",
        "foo@bar+baz.com",
        "foo@bar..com"
      ]
      invalid_addresses.each do |invalid_address|
        user = build(:user, email: invalid_address)
        expect(user).not_to be_valid, "#{invalid_address.inspect} should be invalid"
      end
    end

    it "saves email addresses as lowercase" do
      mixed_case_email = "Foo@ExAmPlE.CoM"
      user = build(:user, email: mixed_case_email)
      user.save
      expect(user.reload.email).to eq mixed_case_email.downcase
    end
  end

  describe "soft delete" do
    let(:user) { create(:user) }

    it "soft deletes the user" do
      expect { user.soft_delete }.to change { user.deleted? }.from(false).to(true)
    end
  end

  describe "scopes" do
    let!(:active_user) { create(:user) }
    let!(:deleted_user) { create(:user, email: "deleted@example.com", deleted_at: 1.day.ago) }

    it "active returns only active users" do
      expect(User.active).to include(active_user)
      expect(User.active).not_to include(deleted_user)
    end

    it "deleted returns only deleted users" do
      expect(User.deleted).to include(deleted_user)
      expect(User.deleted).not_to include(active_user)
    end
  end
end
