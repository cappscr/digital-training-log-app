module Api
  module V1
    class SessionsController < Api::ApplicationController
      skip_before_action :verify_authenticity_token, only: [ :create, :destroy ]

      def create
        user = User.find_by(email: params[:email].downcase)

        if user&.authenticate(params[:password])
          log_in(user)

          return render json: user, status: :ok
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
