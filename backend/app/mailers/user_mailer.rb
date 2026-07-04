class UserMailer < ApplicationMailer
  def account_activation(user)
    @user = user
    @activation_url = "#{ENV['FRONTEND_URL']}/activate?token=#{user.activation_token}&email=#{CGI.escape(user.email)}"
    mail to: user.email, subject: "Confirm your Digital Training Log App account"
  end

  def password_reset(user)
    @user = user
    @reset_url = "#{ENV['FRONTEND_URL']}/reset-password?token=#{user.reset_token}&email=#{CGI.escape(user.email)}"
    mail to: user.email, subject: "Reset your Digital Training Log App password"
  end

  def password_reset_success(user)
    @user = user
    @reset_url = "#{ENV['FRONTEND_URL']}/forgot-password"
    @updated_at = user.updated_at.strftime("%B %d, %Y at %I:%M %p")
    mail to: user.email, subject: "Your Digital Training Log App password has been reset"
  end
end
