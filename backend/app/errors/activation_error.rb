class ActivationError < ApplicationError
  problem_type "https://api.digitaltraininglog.com/problems/activation-error"
  problem_title "Activation Error"

  def initialize(status:, detail:, instance: nil, errors: nil)
    super(status: status || 403, detail: detail, instance: instance)
  end
end
