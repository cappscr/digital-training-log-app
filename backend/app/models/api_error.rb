class ApiError
  include ActiveModel::Model
  include ActiveModel::Serialization

   attr_accessor :errors, :status
end
