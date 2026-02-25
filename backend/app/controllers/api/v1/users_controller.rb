class Api::V1::UsersController < ApplicationController
  include UsersHelper

  def show
    @user = User.find(params[:id])
    gravatar_id = gravatar_id_for(@user)
    render json: @user.as_json(only: [ :id, :name, :email, :created_at, :updated_at ]).merge(gravatar_id: gravatar_id)
  end
end
