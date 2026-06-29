class UserMailer < ApplicationMailer
  def account_activation(user)
    @user = user
    @activation_url = "#{ENV['FRONTEND_URL']}/activate?token=#{user.activation_token}&email=#{CGI.escape(user.email)}"
    mail to: user.email, subject: "Confirm your Digital Training Log App account"
  end
end
