export default {
  title: 'Docusaurus Example',
  url: 'https://example.com',
  baseUrl: '/',

  future: {
    v4: true,
    experimental_faster: true,
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs',
        breadcrumbs: true,
        routeBasePath: '/',
        include: ['**/*.md', '**/*.mdx'],
        sidebarPath: 'sidebars.js',
        docsRootComponent: '@theme/DocsRoot',
        docVersionRootComponent: '@theme/DocVersionRoot',
        docRootComponent: '@theme/DocRoot',
        docItemComponent: '@theme/DocItem',
      },
    ],
    ['@mikemimik/docusaurus-plugin-lunr', { routeBasePath: '/' }],
  ],
  themes: ['@docusaurus/theme-classic'],
  themeConfig: {
    navbar: {
      title: 'Docusaurus Example',
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
        },
        {
          type: 'doc',
          position: 'right',
          docId: 'doc-1',
          label: 'Docs',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
  },
};
