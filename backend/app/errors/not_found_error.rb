class NotFoundError < ApplicationError
  problem_type "not-found-error"
  problem_title "Resource Not Found"
  problem_status 404
end
