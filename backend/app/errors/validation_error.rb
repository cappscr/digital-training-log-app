class ValidationError < ApplicationError
  problem_type "validation-error"
  problem_title "Validation Error"
  problem_status 422
end
