class ActivationError < ApplicationError
  problem_type "https://api.digitaltraininglog.com/problems/activation-error"
  problem_title "Activation Error"
  problem_status 422
end
