require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "account_activation" do
    let(:user) { create(:user) }
    let(:mail) { UserMailer.account_activation(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Confirm your Digital Training Log App account")
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ "noreply@mail.digitaltraininglog.com" ])
    end

    it "renders the activation token and email in the link" do
      expect(mail.body.encoded).to match("#{user.activation_token}")
      expect(mail.body.encoded).to match(CGI.escape(user.email))
    end
  end

  describe "password_reset" do
    let(:user) { FactoryBot.create(:user) }
    let(:mail) { UserMailer.password_reset(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Reset your Digital Training Log App password")
      expect(mail.to).to eq([ user.email ])
      expect(mail.from).to eq([ "noreply@mail.digitaltraininglog.com" ])
    end

    it "renders the reset token and email in the link" do
      expect(mail.body.encoded).to match("#{user.reset_token}")
      expect(mail.body.encoded).to match(CGI.escape(user.email))
    end
  end
end
