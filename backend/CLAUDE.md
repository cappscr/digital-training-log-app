# Digital Training Log Backend

This directory houses the Digital Training Log app backend. It is an API only Rails application.

## Project Structure

Standard Rails API-only layout. Key conventions:
- SQLite in development and test environments
- PostgreSQL (Supabase) in production
- All routes are namespaced under `/api/`

## Tech Stack

| Concern | Choice |
|---|---|
| API | Rails (API-only mode) |
| Database (dev/test) | SQLite |
| Database (production) | PostgreSQL via Supabase |

## Primary Keys

Digital Training Log uses UUID primary keys on all tables and UUIDs are generated client side to support the future migration of the app to local first.

## Running the project

The Rails API must be running separately on port 3000 for API calls to work in development. From `backend/`:

```bash
bundle install
rails server
```
