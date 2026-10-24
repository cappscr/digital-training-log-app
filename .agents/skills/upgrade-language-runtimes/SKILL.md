# Upgrading Language Runtime Versions

This project uses asdf to manage the locally installed versions of language runtimes for Ruby and JavaScript.

## Refresh the plugins

First step is to refresh the plugins and then pin the new versions:

```bash
asdf plugin update nodejs
asdf plugin update ruby
asdf nodejs update-nodebuild

asdf latest nodejs major_version
asdf latest ruby major_version
```

The install the new versions:

```bash
asdf install nodejs latest:major_version
asdf install ruby latest:major_version
```

Then pin them from the repo root so asdf writes the updated versions to the `.tool-versions` file:

```bash
asdf set nodejs major_version.x.x
asdf set ruby major_version.x.x
```

The run again from `backend` to update the `.tool-versions` file there:

```bash
asdf set ruby major_version.x.x
```