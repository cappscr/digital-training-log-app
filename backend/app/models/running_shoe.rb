class RunningShoe < ApplicationRecord
  belongs_to :user

  before_save :trim_brand_model
  before_save :nullify_blank_nickname

  validates :brand, presence: true, length: { maximum: 100 }
  validates :model, presence: true, length: { maximum: 100 }
  validates :nickname, length: { maximum: 100 }, allow_blank: true

  validates :date_first_used,
    comparison: { less_than_or_equal_to: -> { Date.current } },
    allow_nil: true

  validates :date_retired,
    comparison: { less_than_or_equal_to: -> { Date.current } },
    allow_nil: true

  validates :date_retired,
    comparison: { greater_than_or_equal_to: :date_first_used },
    allow_nil: true,
    if: -> { date_first_used.present? }

  scope :active, -> { where(date_retired: nil) }
  scope :retired, -> { where.not(date_retired: nil) }

  def retired?
    date_retired.present?
  end

  private

  def trim_brand_model
    brand.strip!
    model.strip!
  end

  def nullify_blank_nickname
    self.nickname = nickname&.strip.presence
  end
end
