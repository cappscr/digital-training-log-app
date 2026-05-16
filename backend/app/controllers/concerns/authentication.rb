module Authentication
  extend ActiveSupport::Concern
  include JsonWebToken

  def log_in(user)
    token = SecureRandom.hex(32)
    if user.update_column(:token_digest, Digest::SHA256.hexdigest(token))
      cookies[:refresh_token] = {
        value: token,
        http_only: true,
        secure: Rails.env.production?,
        same_site: :strict
      }
      jwt_encode(user_id: user.id)
    else
      false
    end
  end

  def current_user
    @current_user ||= begin
      token = extract_access_token_from_header
      return nil unless token

      payload = jwt_decode(token)
      return nil unless payload

      User.active.find_by(id: payload[:user_id])
    rescue TokenExpiredError, InvalidTokenError
      nil
    end
  end

  def logged_in?
    current_user.present?
  end

  def log_out
    @current_user&.update_column(:token_digest, nil)
    cookies.delete(:refresh_token)
    @current_user = nil
  end

  def require_login
    render_problem_detail(UnauthenticatedError.new(detail: "You must be logged in")) unless logged_in?
  end

  private

  def extract_access_token_from_header
    request.headers["Authorization"]&.split(" ")&.last
  end
end
