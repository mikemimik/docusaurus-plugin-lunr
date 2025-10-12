# docusaurus-plugin-lunr

Docusaurus (v2/v3) plugin to create a local search index for use with Lunr.js

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

## Usage

Once you've added this plugin to the `plugins` list the index
_(described below)_ will be generated when `docusaurus build` is run. If you
want to implement search in the `Navbar` by using the `themeConfig.navbar`
configuration with an item `{ type: 'search' }` then you'll need to swizzle
the `SearchBar` from `@docusaurus/theme-classic` to do so.

```bash
docusaurus swizzle @docusaurus/theme-classic SearchBar --eject
```

The above command will give you a `theme/SearchBar` component, where you can
import `@theme/LunrSearchBar` to use. You can see an example of this in the
`example/` folder in this repository.

> [!IMPORTANT]
> There must be a `versions.json` file at the root of the docusaurus instance
> in order for this plugin to function correctly. It's not necessary for
> there to be _actual_ versions but this file must exist, and at the very
> least contain an empty array "`[]`".

```javascript
import LunrSearchBar from '@theme/LunrSearchBar';

const SearchBar = () => {
  return (
    <LunrSearchBar
      handleSearchBarToggle={/* function */ () => {}}
      isSearchBarExpanded={/* boolean */ true}
    />
  );
};
```

## Generated index

The plugin watches and processes markdown files in a similar manner to the
official [docusaurus-plugin-content-docs](https://github.com/facebook/docusaurus/tree/master/packages/docusaurus-plugin-content-docs) plugin. The content is stripped of HTML tags and Markdown formatting,
and the resulting plaintext is added to a [Lunr.js](https://lunrjs.com/) index.
This index then gets added to the global plugin data which is then read by the
`LunrSearchBar` component. The index contains the following fields for each
document:

- **content**: plaintext content
- **route**: the permalink for the generated document route
- **title**: document title found in the front matter
- **version**: the associated documentation version, or `null` if no versions are present

## LunrSearchBar component

The plugin includes a theme `LunrSearchBar` theme component which consumes the
Lunr index. By including the plugin in the Docusaurus config, this component
will be made available through the `@theme` alias.

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
