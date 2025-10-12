# docusaurus-plugin-lunr

Docusaurus v2 plugin to create a local search index for use with Lunr.js

> [!Note]
> This library was created with [typescript-starter](https://github.com/bitjson/typescript-starter).

## Installation

Install the plugin with npm:

```bash
npm install --save @mikemimik/docusaurus-plugin-lunr
```

Add the plugin do `docusaurus.config.js`:

```javascript
module.exports = {
  // ...
  plugins: [
    // ...
    '@mikemimik/docusaurus-plugin-lunr',
  ],
};
```

```javascript
module.exports = {
  // ...
  plugins: [
    // ...
    [
      '@mikemimik/docusaurus-plugin-lunr',
      {
        // INFO: This value should match what is
        // set for @docusaurus/pluing-content-docs
        baseRoutePath: '/',
      },
    ],
  ],
};
```

## Generated index

The plugin watches and processes markdown files in a similar manner to the official
[docusaurus-plugin-content-docs](https://github.com/facebook/docusaurus/tree/master/packages/docusaurus-plugin-content-docs) plugin. The content is stripped of HTML tags and Markdown formatting,
and the resulting plaintext is added to a [Lunr.js](https://lunrjs.com/) index which gets serialized to the standard Docusaurus v2 plugin [contentLoaded createData](https://v2.docusaurus.io/docs/lifecycle-apis#async-contentloadedcontent-actions) output location (by default, `<repo>/.docusaurus/docusaurus-plugin-lunr/search-index.json`).

The index contains the following fields for each document:

- **content**: plaintext content
- **route**: the permalink for the generated document route
- **title**: document title found in the front matter
- **version**: the associated documentation version, or `null` if no versions are present

## SearchBar component

The plugin includes a theme SearchBar theme component which consumes the Lunr index. By including the plugin in the
Docusaurus config, the Navbar will include the SearchBar component which uses the generated search index. This works
because the plugin-generated index is available via import, as the Docusaurus v2 core Webpack configuration configures
an alias for `@generated`.

## Known limitations

The custom React hook used by the SearchBar component performs a dynamic import via `import(@site/versions.json)`. If
a `versions.json` file is not present at the root of your docs repo, this will throw, and you apparently not catch that
error and use a default empty array. The `versions.json` file is not created until you use the Docusaurus CLI to archive
a varsion. Note that this plugin does not actually require you to have versions -- it only needs `version.json`, so the
current suggestion is to manually create the file with emtpy array contents.

## Contributions

> [!NOTE]
>
> - TODO: update this section of the README

```json
  "scripts-info": {
    "info": "Display information about the package scripts",
    "build": "Clean and rebuild the project",
    "fix": "Try to automatically fix any linting problems",
    "test": "Lint and unit test the project",
    "watch": "Watch and rebuild the project on save, then rerun relevant tests",
    "cov": "Rebuild, run tests, then create and open the coverage report",
    "doc": "Generate HTML API documentation and open it in a browser",
    "doc:json": "Generate API documentation in typedoc JSON format",
    "version": "Bump package.json version, update CHANGELOG.md, tag release",
    "reset": "Delete all untracked files and reset the repo to the last commit",
    "prepare-release": "One-step: clean, build, test, publish docs, and prep a release"
  },
```
