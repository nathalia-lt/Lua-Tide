class FavoritelocationsController < ApplicationController
    def index
        if params[:user_id]
            user = find_user
            favoritelocations = user.favoritelocations
        else
            favoritelocations = favoritelocations.all
        end
            render json: favoritelocations, include: :user, status: :ok
    end
    

    def show
        favoritelocations = find_favoritelocations
        render json: favoritelocations, status: :ok
    end

    def create
        user = find_user
        favoritelocations = user.favoritelocations.create!(favoritelocations_params)
        render json: favoritelocations, status: :created
    end

    def destroy
        favoritelocations = find_favoritelocations
        favoritelocations.destroy
        head :no_content
    end

    def update
        favoritelocations = find_favoritelocations
        favoritelocations.update!(pet_params)
        render json: favoriteslocations
    end

    private
    
    def favoritelocations_params
        params.permit(:id, :latitude, :longitude :city :user_id)
    end

    def find_user
        User.find(session[:user_id])
    end


    def find_favoritelocations
        favoritelocations.find(params[:id])
    end

end


