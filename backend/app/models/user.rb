class User < ApplicationRecord
  self.primary_key = 'id'

  before_create :set_id
  before_save { self.email = email.downcase }

  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  has_secure_password
  validates :password, presence: true, length: { minimum: 8 }

  scope :active, -> { where(deleted_at: nil) }
  scope :deleted, -> { where.not(deleted_at: nil) }

  def soft_delete
    update!(deleted_at: Time.current)
  end

  def deleted?
    deleted_at.present?
  end

  private

  def set_id
    self.id ||= SecureRandom.uuid
  end
end
