class UserMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/account_activation
  def account_activation
    user = User.last
    user.activation_token = SecureRandom.urlsafe_base64
    UserMailer.account_activation(user)
  end

  def password_reset
    user = User.last
    user.reset_token = SecureRandom.urlsafe_base64
    UserMailer.password_reset(user)
  end

  def password_reset_success
    user = User.last
    user.updated_at = Time.zone.now
    UserMailer.password_reset_success(user)
  end
end
