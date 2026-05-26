require 'rails_helper'

RSpec.describe UserSession, type: :model do
  let(:user) { create(:user) }

  describe ".generate_for" do
    it "creates a new session for the user" do
      session = UserSession.generate_for(user)
      expect(session).to be_persisted
      expect(session.user).to eq(user)
      expect(session.refresh_token).not_to be_nil
    end

    it "sets the correct expiration time based on remember_me" do
      session = UserSession.generate_for(user, remember_me: true)
      expect(session.expires_at).to be_within(1.minute).of(30.days.from_now)

      session = UserSession.generate_for(user, remember_me: false)
      expect(session.expires_at).to be_within(1.minute).of(2.weeks.from_now)
    end
  end

  describe ".find_by_token" do
    it "finds the session by raw token" do
      session = UserSession.generate_for(user)
      found_session = UserSession.find_by_token(session.refresh_token)
      expect(found_session).to eq(session)
    end

    it "returns nil for an invalid token" do
      expect(UserSession.find_by_token("invalid")).to be_nil
    end
  end

  describe "#authenticated?" do
    it "returns true for a valid token" do
      session = UserSession.generate_for(user)
      expect(session.authenticated?(session.refresh_token)).to be true
    end

    it "returns false for an invalid token" do
      session = UserSession.generate_for(user)
      expect(session.authenticated?("invalid")).to be false
    end
  end

  describe "#expired?" do
    it "returns false for a non-expired session" do
      session = UserSession.generate_for(user)
      expect(session.expired?).to be false
    end

    it "returns true for an expired session" do
      session = UserSession.generate_for(user, remember_me: false)
      travel_to(3.weeks.from_now) do
        expect(session.expired?).to be true
      end
    end
  end

  describe "#touch_last_used" do
    it "updates the last_used_at timestamp" do
      session = UserSession.generate_for(user)
      old_timestamp = session.last_used_at
      travel_to(1.hour.from_now) do
        session.touch_last_used
        expect(session.reload.last_used_at).to be > old_timestamp
      end
    end
  end
end
