class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :user, :city, :latitude, :longitude
end
