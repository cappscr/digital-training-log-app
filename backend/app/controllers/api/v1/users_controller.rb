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
        access_token = log_in(@user)
        render json: { user: UserSerializer.new(@user), access_token: access_token }, status: :created
      rescue ActiveRecord::RecordNotUnique
        raise DuplicateIdError.new(detail: "A record with this ID already exists")
      end

      def user_params
        params.expect(user: [ :id, :name, :email, :password, :password_confirmation ])
      end
    end
  end
end
