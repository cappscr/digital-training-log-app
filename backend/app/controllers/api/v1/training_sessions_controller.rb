module Api
  module V1
    class TrainingSessionsController < Api::ApplicationController
      NUMBER_OF_DAYS_IN_RANGE = 21

      before_action :require_login, only: [ :create, :destroy, :index, :show, :update ]

      def index
        @training_sessions = current_user.training_sessions
          .includes(sport_details: :exercises)
          .then { |scope| apply_date_range(scope) }
          .order(session_date: :desc, session_time: :desc)

        render json: @training_sessions, each_serializer: TrainingSessionSerializer
      end

      def update
        training_session = current_user.training_sessions.find(params[:id])
        TrainingSessionForm.new(
          training_session,
          update_params
        ).save

        render json: training_session, serializer: TrainingSessionSerializer
      end

      def create
        training_session = TrainingSessionForm.new(
          current_user.training_sessions.build,
          training_session_create_params
        ).save

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

      def apply_date_range(scope)
        end_date = parse_date_param(:to) || Date.current
        end_date = Date.current if end_date > Date.current
        start_date = end_date - (NUMBER_OF_DAYS_IN_RANGE - 1)

        scope.where(session_date: start_date..end_date)
      end

      def parse_date_param(key)
        value = params[key].presence
        return if value.blank?

        Date.iso8601(value)
      rescue Date::Error
        raise ActionController::BadRequest, "#{key} must be YYYY-MM-DD"
      end

      def training_session_create_params
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
              :activity,
              :distance,
              :distance_unit,
              :elevation_gain,
              :elevation_unit,
              :average_cadence,
              :average_heart_rate,
              exercises: [ [
                :id,
                :name,
                :sets,
                :reps,
                :weight,
                :weight_unit,
                :bodyweight,
                :position
              ] ]
            ]
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
              :activity,
              :distance,
              :distance_unit,
              :elevation_gain,
              :elevation_unit,
              :average_cadence,
              :average_heart_rate,
              exercises: [ [
                :id,
                :name,
                :sets,
                :reps,
                :weight,
                :weight_unit,
                :bodyweight,
                :position
              ] ]
            ]
          ]
        )
      end
    end
  end
end
