# Digital Training Log Backend

## Commands

- Dev Server: `bin/rails s`
- Lint: `bin/rubocop`
- Test: `bundle exec rspec`
- Migrate DB: `bin/rails db:migrate`
- Seed DB: `bin/rails db:seed`
- Drop all training sessions and reseed: `bin/rails training_sessions:reseed`

## Conventions

- SQLite in development and test environments
- PostgreSQL (Supabase) in production
- All routes are namespaced under `/api/`
- UUIDs for primary keys on all tables and UUIDs are generated client side to support the future migration of the app to local first; however DB should provide default UUIDs when missing from API requests.

## Architecture

## Things Agents get wrong
