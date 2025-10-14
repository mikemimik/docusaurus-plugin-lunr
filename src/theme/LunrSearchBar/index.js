/**
 * Based on code from @docusaurus/theme-search-algolia
 * by Facebook, Inc., licensed under the MIT license.
 */

import React, {
  createElement,
  useEffect,
  useMemo,
  useRef,
  Fragment,
} from 'react';
import { createRoot } from 'react-dom/client';
import * as lunr from 'lunr';
import { autocomplete } from '@algolia/autocomplete-js';

import { usePluginData } from '@docusaurus/useGlobalData';

import useDocusaurusDocsVersion from '../hooks/version';

import '@algolia/autocomplete-theme-classic';

const defaultHeaderTemplate = () => {
  return null;
};

const defaultItemTemplate = (params) => {
  const { item, components } = params;

  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={item} attribute="title" />
          </div>
          <div className="aa-ItemContentDescription">url: {item.route}</div>
        </div>
      </div>
    </div>
  );
};

const defaultNoResultsTemplate = () => {
  return 'No results found.';
};

const defaultTransform = ({ result, documents }) => {
  const document = documents.find((document) => document.route === result.ref);

  return { ...document, result };
};

const Search = (props) => {
  const {
    maxResults = 8,
    headerTemplate = defaultHeaderTemplate,
    itemTemplate = defaultItemTemplate,
    noResultsTemplate = defaultNoResultsTemplate,
    components = null,
    placeholder = 'Search',
    transform = defaultTransform,
  } = props;

  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  const currentVersion = useDocusaurusDocsVersion();
  const pluginData = usePluginData('docusaurus-plugin-lunr');

  const { searchIndex } = pluginData;
  const { index, documents } = searchIndex;

  const source = useMemo(() => lunr.Index.load(index), [index]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder,
      insights: false,
      ...(components && { components }),
      getSources() {
        return [
          {
            sourceId: 'index',
            getItems({ query: inputQuery }) {
              const terms = inputQuery
                .split(' ')
                .map((each) => each.trim().toLowerCase())
                .filter((each) => each.length > 0);

              const results = source
                .query((query) => {
                  if (currentVersion) {
                    query.term(currentVersion, {
                      fields: ['version'],
                      presence: lunr.Query.presence.REQUIRED,
                    });
                  }
                  query.term(terms, { fields: ['title', 'content'] });
                  query.term(terms, {
                    fields: ['title', 'content'],
                    wildcard: lunr.Query.wildcard.TRAILING,
                  });
                })
                .map((result) => transform({ result, documents }))
                .slice(0, maxResults);

              return results;
            },
            getItemUrl({ item }) {
              return item.route;
            },
            getItemInputValue({ item }) {
              return item.title;
            },
            onSelect(params) {
              const { itemUrl, navigator } = params;
              navigator.navigate({ itemUrl });
            },
            templates: {
              header: headerTemplate,
              item: itemTemplate,
              noResults: noResultsTemplate,
            },
          },
        ];
      },
      detachedMediaQuery: '',
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
    });

    return () => {
      search.destroy();
    };
  }, [containerRef.current]);

  return <div ref={containerRef} />;
};

export default Search;
