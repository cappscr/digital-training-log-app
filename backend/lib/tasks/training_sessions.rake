namespace :training_sessions do
  desc "Destroy all training sessions and re-seed (development only)"
  task reseed: :environment do
    abort "Refusing to run outside development" unless Rails.env.development?

    count = TrainingSession.count
    TrainingSession.destroy_all
    puts "Destroyed #{count} training sessions"

    Rake::Task["db:seed"].invoke
  end
end
