module Api
  module V1
    class UsersController < Api::ApplicationController
      skip_before_action :verify_authenticity_token, only: [ :create ]

      def show
        @user = User.find(params[:id])
        render json: @user
      end

      def create
        @user = User.new(user_params)
        @user.save!
        log_in(@user)
        render json: @user, status: :created
      end

      def user_params
        params.expect(user: [ :name, :email, :password, :password_confirmation ])
      end
    end
  end
end
