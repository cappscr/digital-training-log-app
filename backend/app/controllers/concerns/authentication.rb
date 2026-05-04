module Authentication extends ActiveSupport::Concern
  def log_in(user)
    token = SecureRandom.hex(32)
    if user.update_column(:token_digest, Digest::SHA256.hexdigest(token))
      cookies[:auth_token] = {
        value: token,
        http_only: true,
        secure: Rails.env.production?,
        same_site: :strict,
      }
    else
      false
    end
  end

  def current_user
    @current_user ||= begin
      token = cookies[:auth_token]
      return nil unless token

      digest = Digest::SHA256.hexdigest(token)
      User.find_by(token_digest: digest)
    end
  end

  def logged_in?
    current_user.present?
  end

  def log_out
    @current_user&.update_column(:token_digest, nil)
    cookies.delete(:auth_token)
    @current_user = nil
  end
end