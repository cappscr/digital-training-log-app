class AuthenticationError < ApplicationError
  problem_type "https://api.digitaltraininglog.com/problems/authentication-error"
  problem_title "Unauthorized"
  problem_status 401
end
