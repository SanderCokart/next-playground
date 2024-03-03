export const navigation = [
  {
    name: 'Fetching',
    description: 'Different ways to fetch data',
    children: [
      {
        name: 'Axios',
        href: '/fetching/axios',
        description: 'Promise based HTTP client for the browser and node.js',
        wip: false,
      },
      {
        name: 'Redaxios',
        href: '/fetching/redaxios',
        description: 'A small wrapper around axios for server-side requests',
        wip: true,
      },
      {
        name: 'Wretch',
        href: '/fetching/wretch',
        description: 'A tiny wrapper built around fetch with some sweet syntactic sugar',
        wip: true,
      },
    ],
  },
];
