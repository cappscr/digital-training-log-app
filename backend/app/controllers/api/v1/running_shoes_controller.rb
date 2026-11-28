module Api
  module V1
    class RunningShoesController < Api::ApplicationController
      before_action :require_login

      def index
        @running_shoes = current_user.running_shoes.all
        render json: @running_shoes, each_serializer: RunningShoeSerializer
      end

      def create
        @running_shoe = current_user.running_shoes.create!(running_shoe_create_params)
        render json: @running_shoe, serializer: RunningShoeSerializer, status: :created
      end

      def show
        @running_shoe = current_user.running_shoes.find(params[:id])
        render json: @running_shoe, serializer: RunningShoeSerializer
      end

      private

      def running_shoe_create_params
        params.expect(
          running_shoe: [
            :id,
            :brand,
            :model,
            :nickname,
            :date_first_used
          ]
        )
      end
    end
  end
end
