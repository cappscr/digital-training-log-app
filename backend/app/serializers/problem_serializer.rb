class ProblemSerializer
  def initialize(error, request)
    @error = error
    @request = request
  end

  def serialize
    payload = {
      type: error_class.type_uri,
      title: error_class.title,
      status: @error.status || error_class.status_code,
      instance: @error.instance || @request.path
    }

    payload[:detail] = @error.detail unless @error.errors.present?
    payload[:errors] = @error.errors if @error.errors.present?
    payload
  end

  private

  def error_class = @error.class
end
