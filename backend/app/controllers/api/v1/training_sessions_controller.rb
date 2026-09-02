module Api
  module V1
    class TrainingSessionsController < Api::ApplicationController
      before_action :require_login, only: [ :create, :index ]

      def index
        @training_sessions = TrainingSession
          .where(user_id: current_user.id)
          .includes(:sport_details)
          .order(session_date: :desc)
        render json: @training_sessions, each_serializer: TrainingSessionSerializer
      end

      def create
        training_session = current_user.training_sessions.build(create_params.except(:sport_details))
        # condition the sport details based on the params[:sport_details][:kind]
        training_session.sport_details = RunningTrainingSession.new(create_params[:sport_details].except(:kind).to_h)
        training_session.save!
        render json: training_session, status: :created
      end

      private

      def create_params
        params.expect(
          training_session: [
            :id,
            :session_date,
            :session_time,
            :duration_seconds,
            :location_type,
            :notes,
            sport_details: [
              :id,
              :kind,
              :distance,
              :elevation_gain,
              :average_cadence,
              :average_heart_rate
            ]
          ]
        )
      end
    end
  end
end