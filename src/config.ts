export const siteConfig = {
  graphqlEndpoint:
    import.meta.env.GRAPHQL_ENDPOINT || 'https://hackers.pub/graphql',
  handle: import.meta.env.HACKERSPUB_HANDLE || 'user',
  minimumVisibility: (import.meta.env.MINIMUM_VISIBILITY || 'PUBLIC') as
    | 'PUBLIC'
    | 'UNLISTED'
    | 'FOLLOWERS'
    | 'DIRECT',
  title: import.meta.env.SITE_TITLE || 'My Blog',
  description:
    import.meta.env.SITE_DESCRIPTION || "A blog powered by Hackers' Pub",
} as const
