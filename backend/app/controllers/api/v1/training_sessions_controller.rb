module Api
  module V1
    class TrainingSessionsController < Api::ApplicationController
      before_action :require_login, only: [ :index ]

      def index
        @training_sessions = TrainingSession
          .where(user_id: current_user.id)
          .includes(:sport_details)
          .order(session_date: :desc)
        render json: @training_sessions, each_serializer: TrainingSessionSerializer
      end
    end
  end
end