class FavoritelocationSerializer < ActiveModel::Serializer
  attributes :id, :city, :latitude, :longitude
  has_one :user
end
