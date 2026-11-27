class RunningShoeSerializer < ActiveModel::Serializer
  attributes :id, :brand, :model, :nickname, :date_first_used, :date_retired
end
