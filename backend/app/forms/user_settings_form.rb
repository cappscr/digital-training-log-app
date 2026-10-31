class UserSettingsForm
  def initialize(user, attributes)
    @user = user
    @attributes = attributes
  end

  def save
    user.assign_attributes(user_attributes)
    user.validate

    settings = user.user_setting || user.build_user_setting
    settings.assign_attributes(user_settings_attributes)
    settings.validate
    settings.errors.each do |error|
      user.errors.add(error.attribute, error.message)
    end

    raise ActiveRecord::RecordInvalid, user if user.errors.any?

    User.transaction do
      user.save!
      user.user_setting.save!
    end
  end

  private

  attr_reader :user, :attributes

  def user_attributes
    attributes.slice(:name)
  end

  def user_settings_attributes
    attributes.slice(
      :microcycle_start_day,
      :default_distance_unit,
      :default_weight_unit,
      :default_elevation_unit
      # :theme (not implemented yet)
    )
  end
end
