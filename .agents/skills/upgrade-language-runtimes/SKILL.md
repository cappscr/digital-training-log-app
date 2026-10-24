# Upgrading Language Runtime Versions

This project uses asdf to manage the locally installed versions of language runtimes for Ruby and JavaScript.

## Refresh the plugins

First step is to refresh the plugins and then pin the new versions:

```bash
asdf plugin update nodejs
asdf plugin update ruby
asdf nodejs update-nodebuild

asdf latest nodejs <major>
asdf latest ruby <major>
```

## Install the new versions

Next run:

```bash
asdf install nodejs latest:<major>
asdf install ruby latest:<major>
```

## Pin the new versions in `.tool-versions`

Then pin them from the repo root so asdf writes the updated versions to the `.tool-versions` file:

```bash
asdf set nodejs <version>
asdf set ruby <version>
```

The run again from `backend` to update the `.tool-versions` file there:

```bash
asdf set ruby <version>
```