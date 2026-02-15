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

## Running Tests in Watch Mode

The app also uses Guard to run the tests in watch mode:

```
bundle exec guard
```

Modify the `Guardfile` in the project root to configure the watchers.
