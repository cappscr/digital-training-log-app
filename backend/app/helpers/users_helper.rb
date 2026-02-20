module UsersHelper
  # Returns the Gravatar ID for the given user.
  def gravatar_id_for(user)
    Digest::MD5.hexdigest(user.email.downcase)
  end
end
