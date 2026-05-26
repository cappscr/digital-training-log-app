class UserSession < ApplicationRecord
  belongs_to :user

  before_create :set_id

  attr_accessor :refresh_token

  def self.generate_for(user, remember_me: false, user_agent: nil)
    raw_token = SecureRandom.urlsafe_base64
    session = new(
      user: user,
      token_digest: digest(raw_token),
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
    digest = digest(raw_token)
    find_by(token_digest: digest)
  end

  def authenticated?(raw_token)
    BCrypt::Password.new(token_digest).is_password?(raw_token)
  end

  def expired?
    expires_at.present? && expires_at < Time.current
  end

  def touch_last_used
    update_column(:last_used_at, Time.current)
  end

  private

  def set_id
    self.id ||= SecureRandom.uuid
  end

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  private_class_method :digest
end