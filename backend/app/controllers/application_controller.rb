class ApplicationController < ActionController::API
  def render_error(record, status: :unprocessable_content)
    error = ApiError.new(errors: record.errors.full_messages)
    render json: error, serializer: ApiErrorSerializer, status: status
  end
end
