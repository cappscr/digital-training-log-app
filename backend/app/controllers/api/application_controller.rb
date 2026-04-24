module Api
  class ApplicationController < ::ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ApplicationError, with: :render_problem_detail
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection

    protect_from_forgery with: :null_session

    def not_found
      raise NotFoundError.new(
        detail: "No route matches #{request.path}",
        instance: request.path
      )
    end

    def render_error(record, status: :unprocessable_content)
      error = ApiError.new(errors: record.errors.full_messages)
      render json: error, serializer: ApiErrorSerializer, status: status
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
  end
end
