import React from 'react';

import LunrSearchBar from '@theme/LunrSearchBar';

// By default, the classic theme does not provide any SearchBar implementation
// If you swizzled this, it is your responsibility to provide an implementation
// Tip: swizzle the SearchBar from the Algolia theme for inspiration:
// npm run swizzle @docusaurus/theme-search-algolia SearchBar
// export {default} from '@docusaurus/Noop';

const SearchComponent = () => {
  return (
    <>
      <LunrSearchBar
        handleSearchBarToggle={(...args) => {
          console.group('LunrSearchBar::handleSearchBarToggle');
          console.log('args:', args);
          console.groupEnd();
        }}
        isSearchBarExpanded
      />
    </>
  );
};

export default SearchComponent;
