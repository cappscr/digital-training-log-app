class DuplicateIdError < ApplicationError
  problem_type "duplicate-id-error"
  problem_title "Duplicate ID"
  problem_status 422
end