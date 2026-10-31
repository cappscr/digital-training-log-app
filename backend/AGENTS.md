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

## Deploy

Railway runs [`bin/release`](bin/release) before the new server container starts. The script runs `bin/rails db:prepare`, then `bin/rails data:migrate`, and it must exit. The start command is only `bin/rails server`. The previous deployment keeps serving during that pre-deploy step.

- Schema migrations ship with the code that uses the new tables. `db:prepare` applies them before the new process boots.
- A data migration that only needs the new models, loaded in the pre-deploy image, can ship in that same merge.
- A data migration that needs the new server to already be handling requests ships in a later merge, after that backend change is in production. On the first deploy, pre-deploy runs while the old server is still writing.
- Data migrations skip rows the new server may already have created, so a later run does not fail on those rows.

## Architecture

## Things Agents get wrong

- Shipping a data migration that depends on the new server in the same merge as that server change. See [Deploy](#deploy).
