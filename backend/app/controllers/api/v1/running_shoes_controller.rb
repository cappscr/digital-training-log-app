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

      def update
        @running_shoe = current_user.running_shoes.find(params[:id])
        return render json: { detail: "Running shoe is retired" }, status: :unprocessable_content if @running_shoe.retired?
        @running_shoe.update!(running_shoe_update_params)
        render json: @running_shoe, serializer: RunningShoeSerializer, status: :ok
      end

      def destroy
        @running_shoe = current_user.running_shoes.find(params[:id])
        @running_shoe.destroy!
        render json: { detail: "Running shoe deleted" }, status: :no_content
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

      def running_shoe_update_params
        params.expect(
          running_shoe: [
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
