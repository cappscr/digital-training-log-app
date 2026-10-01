module Api
  module V1
    class TrainingSessionsController < Api::ApplicationController
      before_action :require_login, only: [ :create, :destroy, :index, :show, :update ]

      def index
        @training_sessions = current_user.training_sessions
          .includes(:sport_details)
          .then { |scope| apply_date_range(scope) }
          .order(session_date: :desc, session_time: :desc)

        render json: @training_sessions, each_serializer: TrainingSessionSerializer
      end

      def update
        training_session = current_user.training_sessions.find(params[:id])
        training_session.assign_attributes(update_params.except(:sport_details))
        # Pass in the existing sport_details_type so that the update action cannot mutate it
        training_session.sport_details.assign_attributes(update_sport_details(update_params, training_session.sport_details_type))
        training_session.save!
        render json: training_session, serializer: TrainingSessionSerializer
      end

      def create
        training_session = current_user.training_sessions.build(training_session_create_params.except(:sport_details))
        sport_details = build_sport_details(training_session_create_params, training_session)
        training_session.sport_details = sport_details
        sport_details.training_session = training_session
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

      def apply_date_range(scope)
        start_date = parse_date_param(:start_date)
        end_date = parse_date_param(:end_date)

        scope = scope.where(session_date: start_date..) if start_date
        scope = scope.where(session_date: ..end_date) if end_date
        scope
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
              :average_heart_rate
            ]
          ]
        )
      end

      def running_create_params(root)
        root.expect(
          sport_details: [
            :id,
            :kind,
            :distance,
            :distance_unit,
            :elevation_gain,
            :elevation_unit,
            :average_cadence,
            :average_heart_rate
          ]
        )
      end

      def cross_training_create_params(root)
        root.expect(
          sport_details: [
            :id,
            :kind,
            :activity,
            :distance,
            :distance_unit,
            :elevation_gain,
            :elevation_unit,
            :average_heart_rate
          ]
        )
      end

      def build_sport_details(params, training_session)
        raise ActionController::ParameterMissing, :sport_details if params[:sport_details].nil?
        case params[:sport_details][:kind]
        when "running"
          RunningTrainingSession.new(running_create_params(params).except(:kind))
        when "cross_training"
          CrossTrainingSession.new(cross_training_create_params(params).except(:kind))
        else
          training_session.errors.add(:"sport_details/kind", "Unknown sport kind: #{params[:sport_details][:kind]}")
          raise ActiveRecord::RecordInvalid, training_session
        end
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
              :average_heart_rate
            ]
          ]
        )
      end

      def running_update_params(root)
        root.expect(
          sport_details: [
            :distance,
            :distance_unit,
            :elevation_gain,
            :elevation_unit,
            :average_cadence,
            :average_heart_rate
          ]
        )
      end

      def cross_training_update_params(root)
        root.expect(
          sport_details: [
            :activity,
            :distance,
            :distance_unit,
            :elevation_gain,
            :elevation_unit,
            :average_heart_rate
          ]
        )
      end

      def update_sport_details(params, kind)
        raise ActionController::ParameterMissing, :sport_details if params[:sport_details].nil?
        case kind
        when "RunningTrainingSession"
          running_update_params(params)
        when "CrossTrainingSession"
          cross_training_update_params(params)
        end
      end
    end
  end
end
