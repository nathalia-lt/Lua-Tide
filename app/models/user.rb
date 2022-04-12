class User < ApplicationRecord
    has_many :users
    has_many :favoritelocations 

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    

    has_secure_password
end
