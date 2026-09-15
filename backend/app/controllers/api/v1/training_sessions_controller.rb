module Api
  module V1
    class TrainingSessionsController < Api::ApplicationController
      before_action :require_login, only: [ :create, :destroy, :index, :show, :update ]

      def index
        @training_sessions = TrainingSession
          .where(user_id: current_user.id)
          .includes(:sport_details)
          .order(session_date: :desc, session_time: :desc)
        render json: @training_sessions, each_serializer: TrainingSessionSerializer
      end

      def update
        training_session = current_user.training_sessions.find(params[:id])
        training_session.assign_attributes(update_params.except(:sport_details))
        training_session.sport_details.assign_attributes(sport_details_params(update_params).except(:kind, :id))
        training_session.save!
        render json: training_session, serializer: TrainingSessionSerializer
      end

      def create
        training_session = current_user.training_sessions.build(create_params.except(:sport_details))
        # condition the sport details based on the params[:sport_details][:kind]
        details = RunningTrainingSession.new(sport_details_params(create_params).except(:kind))
        training_session.sport_details = details
        details.training_session = training_session
        training_session.save!
        render json: training_session, status: :created
      end

      def show
        training_session = current_user.training_sessions.find(params[:id])
        render json: training_session, serializer: TrainingSessionSerializer
      end

      def destroy
        training_session = current_user.training_sessions.find(params[:id])
        training_session.destroy!
        head :no_content
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
              :distance_unit,
              :elevation_gain,
              :average_cadence,
              :average_heart_rate
            ]
          ]
        )
      end

      def sport_details_params(root)
        root.expect(
          sport_details: [
            :id,
            :kind,
            :distance,
            :distance_unit,
            :elevation_gain,
            :average_cadence,
            :average_heart_rate
          ]
        )
      end

      def update_params
        params.expect(
          training_session: [
            :session_date,
            :session_time,
            :duration_seconds,
            :location_type,
            :notes,
            sport_details: [
              :id,
              :kind,
              :distance,
              :distance_unit,
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
