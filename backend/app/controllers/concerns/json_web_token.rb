module JsonWebToken
  extend ActiveSupport::Concern

  SECRET = Rails.application.secret_key_base

  def jwt_encode(payload, exp = 15.minutes.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET, "HS256")
  end

  def jwt_decode(token)
    decoded = JWT.decode(token, SECRET, true, algorithm: "HS256")
    HashWithIndifferentAccess.new(decoded[0])
  rescue JWT::ExpiredSignature
    raise TokenExpiredError.new(detail: "Token has expired")
  rescue JWT::DecodeError
    raise InvalidTokenError.new(detail: "Invalid token")
  end
end