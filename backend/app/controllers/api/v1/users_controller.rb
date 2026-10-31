module Api
  module V1
    class UsersController < Api::ApplicationController
      before_action :require_login, only: [ :me, :show, :update ]

      def show
        @user = User.find(params[:id])
        render json: @user
      end

      def create
        @user = User.new(user_params)
        @user.save!
        @user.send_activation_email
        render json: @user, status: :created
      rescue ActiveRecord::RecordNotUnique
        raise DuplicateIdError.new(detail: "A record with this ID already exists")
      end

      def update
        User.transaction do
          current_user.update!(user_update_params.slice(:name))
          current_user.user_setting.update!(user_update_params.except(:name))
        end
        render json: current_user
      end

      def me
        render json: current_user
      end

      private

      def user_params
        params.expect(user: [ :id, :name, :email, :password, :password_confirmation ])
      end

      def user_update_params
        params.expect(user: [ :name, :microcycle_start_day, :default_weight_unit, :default_distance_unit, :default_elevation_unit ])
      end
    end
  end
end
