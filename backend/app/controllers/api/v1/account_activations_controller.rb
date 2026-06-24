module Api
  module V1
    class AccountActivationsController < Api::ApplicationController
      def update
        user = User.active.find_by(email: params[:email])

        if user && !user.activated? && user.authenticated?(:activation, params[:id])
          user.activate
          log_in(user)
          render json: user, status: :ok
        else
          render_problem_detail(ActivationError.new(
            status: :not_found,
            detail: "Invalid activation link",
            instance: request.path
          ))
        end
      end
    end
  end
end
