class TokenExpiredError < ApplicationError
  problem_type "https://api.digitaltraininglog.com/problems/token-expired-error"
  problem_title "Token Expired"
  problem_status 401
end