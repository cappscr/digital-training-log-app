class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  before_create :set_id

  private

  def set_id
    self.id ||= SecureRandom.uuid
  end
end
