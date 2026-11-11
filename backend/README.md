# Digital Training Log API

This is the backend API application for the [Digital Training Log Application](https://app.digitaltraininglog.com) by [Christopher Capps](https://www.christophercapps.com).

## Getting Started

To get started with the app, clone the repo and then install the needed gems:

```
gem install bundler
bundle config set --local without 'production'
bundle install
```

Next, migrate the database:

```
rails db:migrate
```

Finally, run the test suite to verify that everything is working correctly:

```
rails test
```

If the test suite passes, you'll be ready to run the app in a local server:

```
rails server
```

## Seeding the database

To seed the database for local development run

```
bin/rails db:seed
# or db:setup
```

There is a rake task to drop and reseed training sessions and strength training exercises, simply run

```
bin/rails training_sessions:reseed
```

## Running Tests in Watch Mode

The app also uses Guard to run the tests in watch mode:

```
bundle exec guard
```

Modify the `Guardfile` in the project root to configure the watchers.
