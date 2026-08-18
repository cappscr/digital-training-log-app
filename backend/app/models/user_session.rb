class UserSession < ApplicationRecord
  belongs_to :user

  attr_accessor :refresh_token

  def self.generate_for(user, remember_me: false, user_agent: nil)
    raw_token = SecureRandom.urlsafe_base64
    session = new(
      user: user,
      token_digest: sha256(raw_token),
      remember_me: remember_me,
      user_agent: user_agent,
      last_used_at: Time.current,
      expires_at: remember_me ? 30.days.from_now : 2.weeks.from_now
    )
    session.refresh_token = raw_token
    session.save!
    session
  end

  def self.find_by_token(raw_token)
    find_by(token_digest: sha256(raw_token))
  end

  def authenticated?(raw_token)
    return false if token_digest.nil?

    self.class.sha256(raw_token) == token_digest
  end

  def expired?
    expires_at.present? && expires_at < Time.current
  end

  def touch_last_used
    update_column(:last_used_at, Time.current)
  end

  def self.sha256(string)
    Digest::SHA256.hexdigest(string)
  end
end
