module SportSession
  extend ActiveSupport::Concern

  included do
    has_one :training_session, as: :sport_session, touch: true
  end
end