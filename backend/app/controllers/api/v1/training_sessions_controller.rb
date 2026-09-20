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
        # Pass in the existing sport_details.kind so that the update action cannot mutate it
        training_session.sport_details.assign_attributes(update_sport_details(update_params, training_session.sport_details_type))
        training_session.save!
        render json: training_session, serializer: TrainingSessionSerializer
      end

      def create
        training_session = current_user.training_sessions.build(create_params.except(:sport_details))
        sport_details = build_sport_details(create_params)
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

      def build_sport_details(params)
        raise ActionController::ParameterMissing, :sport_details if params[:sport_details].nil?
        case params[:sport_details][:kind]
        when "running"
          RunningTrainingSession.new(running_create_params(params).except(:kind))
        when "cross_training"
          CrossTrainingSession.new(cross_training_params(params).except(:kind))
        else
          raise BadRequestError, "Unknown sport kind: #{params[:sport_details][:kind]}"
        end
      end

      def update_sport_details(params, kind)
        raise ActionController::ParameterMissing, :sport_details if params[:sport_details].nil?
        case kind
        when "RunningTrainingSession"
          running_update_params(update_params)
        when "CrossTrainingSession"
          cross_training_params(update_params).except(:id)
        end
      end

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
            :average_cadence,
            :average_heart_rate
          ]
        )
      end

      def running_update_params(root)
        root.expect(
          sport_details: [
            :distance,
            :distance_unit,
            :elevation_gain,
            :average_cadence,
            :average_heart_rate
          ]
        )
      end

      def cross_training_params(root)
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
