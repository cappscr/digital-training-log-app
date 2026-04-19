class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :updated_at, :gravatar_id

  def gravatar_id
    Digest::MD5.hexdigest(object.email.downcase.strip)
  end
end
