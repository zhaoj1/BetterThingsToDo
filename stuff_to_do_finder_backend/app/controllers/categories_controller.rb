class CategoriesController < ApplicationController

    def index

        categories = Category.all
        render json: activities

    end

end
