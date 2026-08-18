module TrainingSessionable
  extend ActiveSupport::Concern

  included do
    has_one :training_session, as: :sport_details, touch: true
  end
end
