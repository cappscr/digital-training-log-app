module Authentication
  extend ActiveSupport::Concern
  include JsonWebToken

  def log_in(user, remember_me: false)
    session = UserSession.generate_for(
      user,
      remember_me: remember_me,
      user_agent: request.user_agent
    )
    cookie_options = {
      value: session.refresh_token,
      http_only: true,
      secure: Rails.env.production?,
      same_site: :strict
    }
    cookie_options[:expires] = 30.days.from_now if remember_me
    cookies[:refresh_token] = cookie_options
    jwt_encode(user_id: user.id)
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

  def current_session
    @current_session ||= find_current_session
  end

  def logged_in?
    current_user.present?
  end

  def log_out
    raw_token = cookies[:refresh_token]
    if raw_token
      session_record = UserSession.find_by_token(raw_token)
      session_record&.destroy
    end
    cookies.delete(:refresh_token)
    @current_user = nil
    @current_session = nil
  end

  def require_login
    render_problem_detail(UnauthenticatedError.new(detail: "You must be logged in")) unless logged_in?
  end

  def refresh_access_token
    raise UnauthenticatedError.new(detail: "No active session") unless current_session
    new_refresh_token = SecureRandom.urlsafe_base64
    current_session.update!(
      token_digest: UserSession.sha256(new_refresh_token),
      expires_at: current_session.remember_me ? 30.days.from_now : 2.weeks.from_now
    )
    cookie_options = {
      value: new_refresh_token,
      http_only: true,
      secure: Rails.env.production?,
      same_site: :strict
    }
    cookie_options[:expires] = 30.days.from_now if current_session.remember_me
    cookies[:refresh_token] = cookie_options
    jwt_encode(user_id: current_session.user.id)
  end

  private

  def find_current_session
    raw_token = cookies[:refresh_token]
    return nil unless raw_token

    record = UserSession.find_by_token(raw_token)
    return nil if record.nil? || record.expired?

    record.touch_last_used
    record
  end

  def extract_access_token_from_header
    request.headers["Authorization"]&.split(" ")&.last
  end
end
