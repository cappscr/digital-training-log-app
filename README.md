# Digital Training Log App

This is the monorepo for the Digital Training Log App

## Frontend

In the `frontend` directory there is a React SPA.

## Backend

In the `backend` directory there is an api only Rails application.

## Setting up the project

It is recommended to use asdf to manage the versions for Ruby and NodeJS used by the project. The current versions are stored in `.tool-versions`

See the [getting started docs](https://asdf-vm.com/guide/getting-started.html) for instructions on installing asdf.

Install any pre-requisites for the `nodejs` and `ruby` plugins and then add the plugins

```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git
```

Finally install the versions specified in `.tool-versions`

```bash
asdf install nodejs
asdf install ruby
```