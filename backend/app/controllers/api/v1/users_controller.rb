class Api::V1::UsersController < ApplicationController
  include UsersHelper

  def show
    @user = User.find(params[:id])
    gravatar_id = gravatar_id_for(@user)
    render json: @user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ]).merge(gravatar_id: gravatar_id)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ]), status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
