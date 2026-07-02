class PasswordResetError < ApplicationError
  problem_type "https://api.digitaltraininglog.com/problems/password-reset-error"
  problem_title "Password Reset Error"

  def initialize(status:, detail:, instance: nil, errors: nil)
    super(status: status || 403, detail: detail, instance: instance)
  end
end
