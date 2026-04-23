class BadRequestError < ApplicationError
  problem_type "bad-request-error"
  problem_title "Bad Request"
  problem_status 400
end
