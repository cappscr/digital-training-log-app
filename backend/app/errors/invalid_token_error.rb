class InvalidTokenError < ApplicationError
  problem_type "https://api.digitaltraininglog.com/problems/invalid-token-error"
  problem_title "Invalid Token"
  problem_status 401
end
