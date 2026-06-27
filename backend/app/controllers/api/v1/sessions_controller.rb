module Api
  module V1
    class SessionsController < Api::ApplicationController
      def create
        user = User.active.find_by(email: params[:email].downcase)

        raise ActivationError.new(status: 403, detail: "Account not activated") unless user&.activated?

        if user&.authenticate(params[:password])
          remember_me = ActiveModel::Type::Boolean.new.cast(params[:remember_me]) || false
          access_token = log_in(user, remember_me: remember_me)

          return render json: { user: UserSerializer.new(user), access_token: access_token }, status: :ok
        end

        raise AuthenticationError.new(detail: "Invalid credentials")
      end

      def destroy
        log_out if logged_in?
        head :no_content
      end

      def refresh
        access_token = refresh_access_token
        render json: { access_token: access_token }, status: :ok
      end
    end
  end
end
