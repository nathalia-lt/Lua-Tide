class FavoritelocationSerializer < ActiveModel::Serializer
  attributes :id, :city, :latitude
  has_one :user
end
