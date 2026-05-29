module Api
  module V1
    class SessionsController < Api::ApplicationController
      def create
        user = User.active.find_by(email: params[:email].downcase)

        if user&.authenticate(params[:password])
          remember_me = params[:remember_me] == true
          access_token = log_in(user, remember_me: remember_me)

          return render json: { user: UserSerializer.new(user), access_token: access_token }, status: :ok
        end

        raise AuthenticationError.new(detail: "Invalid credentials")
      end

      def destroy
        log_out if logged_in?
        head :no_content
      end
    end
  end
end
