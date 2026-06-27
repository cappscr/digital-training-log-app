class ApplicationError < StandardError
  attr_reader :detail, :instance, :status, :errors

  def self.problem_type(problem)
    @type_uri = "https://api.digitaltraininglog.com/errors/#{problem}"
  end

  def self.problem_title(title)
    @title = title
  end

  def self.problem_status(code)
    @status_code = code
  end

  def self.type_uri = @type_uri
  def self.title = @title
  def self.status_code = @status_code

  def initialize(detail:, instance: nil, errors: nil, status: nil)
    @detail = detail
    @instance = instance
    @errors = errors
    @status = status || self.class.status_code
    super(detail)
  end
end
