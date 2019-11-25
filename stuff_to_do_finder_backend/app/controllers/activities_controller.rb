class ActivitiesController < ApplicationController

    def create
        
        activity = Activity.new(activityParams)

        if activity.save
            render json: activity
        else
            render json: 'error'
        end

    end

    def index

        activities = Activity.all
        render json: activities

    end

    def show

        activity = Activity.find(params[:id])
        render json: activity, status: :ok

      end

    private

    def activityParams
        params.require(:activity).permit(:user_id, :venue_name)
    end

end
