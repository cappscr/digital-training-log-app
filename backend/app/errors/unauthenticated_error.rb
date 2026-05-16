class UnauthenticatedError < ApplicationError
  problem_type "https://api.digitaltraininglog.com/problems/unauthenticated"
  problem_title "Unauthorized"
  problem_status 401
end