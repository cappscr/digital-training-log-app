module Api
  module V1
    class AccountActivationsController < Api::ApplicationController
      def create
        user = User.active.find_by(email: params[:email])
        if user
          raise ActivationError.new(
            status: 403,
            detail: "User is already activated",
            instance: request.path
          ) if user.activated?
          user.create_new_activation_digest
          user.send_activation_email
          render json: { message: "Activation email sent" }, status: :ok
        else
          render_problem_detail(ActivationError.new(
            status: 404,
            detail: "Email address not found",
            instance: request.path
          ))
        end
      end

      def update
        user = User.active.find_by(email: params[:email])

        if user && !user.activated? && user.authenticated?(:activation, params[:id]) && !user.activation_expired?
          user.activate
          render json: user, status: :ok
        else
          render_problem_detail(ActivationError.new(
            status: 404,
            detail: "Invalid or expired activation link",
            instance: request.path
          ))
        end
      end
    end
  end
end
