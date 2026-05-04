module Api
  class ApplicationController < ::ApplicationController
    include ActionController::RequestForgeryProtection
    include ActionController::Cookies
    include Authentication

    protect_from_forgery with: :null_session

    rescue_from ActiveRecord::RecordNotFound,       with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid,        with: :render_record_invalid
    rescue_from ApplicationError,                   with: :render_problem_detail
    rescue_from ActionController::ParameterMissing, with: :render_bad_request

    def not_found
      raise NotFoundError.new(
        detail: "No route matches #{request.path}",
        instance: request.path
      )
    end

    private

      def render_problem_detail(error)
        serialized = ProblemSerializer.new(error, request).serialize
        render json: serialized,
             status: error.class.status_code,
             content_type: "application/problem+json"
      end

      def render_not_found(error)
        not_found_error = NotFoundError.new(
          detail: error.message,
          instance: request.path
        )
        render_problem_detail(not_found_error)
      end

      def render_record_invalid(error)
        record = error.record
        root_key = record.model_name.param_key

        invalid_error = ValidationError.new(
          detail: error.record.errors.full_messages.to_sentence,
          instance: request.path,
          errors: error.record.errors.map do |e|
            {
              detail: e.message.capitalize,
              pointer: "#/#{root_key}/#{e.attribute}"
            }
          end
        )
        render_problem_detail(invalid_error)
      end


      def render_bad_request(error)
        bad_request = BadRequestError.new(
          detail: "Required parameter missing: #{error.param}",
          instance: request.path
        )
        render_problem_detail(bad_request)
      end
  end
end
