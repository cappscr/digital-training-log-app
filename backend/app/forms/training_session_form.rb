class TrainingSessionForm
  SESSION_ATTRIBUTES = %i[session_date session_time duration_seconds location_type notes].freeze

  SPORT_ATTRIBUTES = {
    "running" => %i[id distance distance_unit elevation_gain elevation_unit average_cadence average_heart_rate],
    "cross_training" => %i[id activity distance distance_unit elevation_gain elevation_unit average_heart_rate],
    "strength_training" => %i[id average_heart_rate]
  }.freeze

  SPORT_CLASSES = {
    "running" => RunningTrainingSession,
    "cross_training" => CrossTrainingSession,
    "strength_training" => StrengthTrainingSession
  }.freeze

  def initialize(training_session, attributes)
    @training_session = training_session
    @attributes = attributes
  end

  def save
    sport_details_attributes = attributes[:sport_details]
    raise ActionController::ParameterMissing, :sport_details if sport_details_attributes.nil?

    if training_session.new_record?
      assign_create(sport_details_attributes)
    else
      assign_update(sport_details_attributes)
    end

    training_session.save!
    training_session
  end

  private

  attr_reader :training_session, :attributes

  def assign_create(sport_details_attributes)
    training_session.assign_attributes(session_attributes(include_id: true))

    details = build_sport_details(sport_details_attributes)
    training_session.sport_details = details
    details.training_session = training_session
  end

  def assign_update(sport_details_attributes)
    training_session.assign_attributes(session_attributes(include_id: false))

    kind = kind_for(training_session.sport_details_type)
    training_session.sport_details.assign_attributes(
      sport_attributes(kind, sport_details_attributes, include_id: false)
    )
    sync_strength_exercises(training_session.sport_details, sport_details_attributes) if kind == "strength_training"
  end

  def build_sport_details(sport_details_attributes)
    kind = sport_details_attributes[:kind]
    sport_class = SPORT_CLASSES[kind]
    if sport_class.nil?
      training_session.errors.add(:"sport_details/kind", "Unknown sport kind: #{kind}")
      raise ActiveRecord::RecordInvalid, training_session
    end

    details = sport_class.new(sport_attributes(kind, sport_details_attributes, include_id: true))
    sync_strength_exercises(details, sport_details_attributes) if kind == "strength_training"
    details
  end

  def session_attributes(include_id:)
    keys = include_id ? [ :id, *SESSION_ATTRIBUTES ] : SESSION_ATTRIBUTES
    attributes.slice(*keys)
  end

  def sport_attributes(kind, sport_details_attributes, include_id:)
    keys = SPORT_ATTRIBUTES.fetch(kind)
    keys -= [ :id ] unless include_id
    sport_details_attributes.slice(*keys)
  end

  def sync_strength_exercises(details, sport_details_attributes)
    details.sync_exercises(sport_details_attributes[:exercises])
  end

  def kind_for(sport_details_type)
    SPORT_CLASSES.each do |kind, sport_class|
      return kind if sport_class.name == sport_details_type
    end
  end
end
