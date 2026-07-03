module Api
  module V1
    class PasswordResetsController < Api::ApplicationController
      def create
        user = User.find_by(email: params[:email])
        if user
          user.create_reset_digest
          user.send_password_reset_email
          render json: { message: "Password reset email sent" }, status: :ok
        else
          raise PasswordResetError.new(
            status: 404,
            detail: "Email address not found",
            instance: request.path
          )
        end
      end

      def update
        user = User.find_by(email: params[:email])
        raise PasswordResetError.new(
          status: 404,
          detail: "Email address not found",
          instance: request.path
        ) unless user
        if user && user.authenticated?(:reset, params[:id]) && !user.password_reset_expired?
          if params[:user][:password].empty?
            raise PasswordResetError.new(
              status: 422,
              detail: "Password can't be empty",
              instance: request.path
            )
          end
          if user.update(password_params)
            render json: { message: "Password has been reset" }, status: :ok
          else
            raise PasswordResetError.new(
              status: 422,
              detail: "Password reset failed",
              instance: request.path
            )
          end
        else
          raise PasswordResetError.new(
            status: 403,
            detail: "Invalid password reset link or link has expired",
            instance: request.path
          )
        end
      end

      private

      def password_params
        params.require(:user).permit(:password, :password_confirmation)
      end
    end
  end
end
