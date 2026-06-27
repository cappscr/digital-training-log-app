module Api
  module V1
    class UsersController < Api::ApplicationController
      before_action :require_login, only: [ :me, :show ]

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

      def me
        render json: current_user
      end

      def user_params
        params.expect(user: [ :id, :name, :email, :password, :password_confirmation ])
      end
    end
  end
end
