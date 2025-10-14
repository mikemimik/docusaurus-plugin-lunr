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
        maxResults={8}
        placeholder={'Search...'}
        transform={({ result, documents }) => {
          const document = documents.find(
            (document) => document.route === result.ref,
          );

          return { ...document, result };
        }}
        headerTemplate={() => {
          return null;
        }}
        itemTemplate={(params) => {
          const { item, components } = params;

          return (
            <div className="aa-ItemWrapper">
              <div className="aa-ItemContent">
                <div className="aa-ItemContentBody">
                  <div className="aa-ItemContentTitle">
                    <components.Highlight hit={item} attribute="title" />
                  </div>
                  <div className="aa-ItemContentDescription">
                    url: {item.route}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default SearchComponent;
