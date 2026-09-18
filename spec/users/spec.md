# Users

## Data Model

Users have name, email, and password_digest attributes, which are of the string type.

| Users | Data Model |
| --- | --- |
| name | string |
| email | string |
| password_digest | string |

`email` addresses should be `downcased` before being saved to the database. The `email` column should be indexed.

### Validations

The following data model validations should be applied
- `name` should not be blank
- `name` should be 50 characters or less
- `email` should not be blank
- `email` should be 255 characters or less
- `email` addresses should contain at least one word character (plus hyphen, dot, or plus), a literal @, at least one letter, digit, hyphen, or dot, a literal ., and at least one word character at the end
- `email` addresses should be unique
- `password` should be non-blank
- `password` should be at least 8 characters
