# Hackers' Pub Astro Template

An Astro template for creating a static blog powered by [Hackers' Pub](https://hackers.pub) GraphQL API.

[한국어 문서](./README-ko.md)

## Features

- 📝 Fetch articles from Hackers' Pub via GraphQL
- 🌍 Multi-language support with automatic translation detection
- 🏷️ Tag-based navigation
- ⚡ Static Site Generation (SSG)
- 🎨 Tailwind CSS styling
- 🔒 Visibility filtering
- 📅 Relative time display
- 👍 Reaction display

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Configure your site by copying `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Edit `.env` with your configuration:

```env
GRAPHQL_ENDPOINT=https://hackers.pub/graphql
HACKERSPUB_HANDLE=your-handle
MINIMUM_VISIBILITY=PUBLIC
SITE_TITLE=Your Blog Title
SITE_DESCRIPTION=Your blog description
```

**Note**:

- For `HACKERSPUB_HANDLE`, use your Hackers' Pub handle without the domain (e.g., `moreal` instead of `moreal@hackers.pub`).
- Astro automatically loads `.env` files and makes them available via `import.meta.env`.

Alternatively, you can edit `src/config.ts` directly to hardcode your configuration.

## Development

Run the development server:

```bash
yarn dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Build

Generate static site:

```bash
yarn build
```

Preview the built site:

```bash
yarn preview
```

## GraphQL Code Generation

If you modify GraphQL queries in `src/lib/graphql/queries.ts`, regenerate types:

```bash
yarn codegen
```

## Code Quality

### Type Checking

Run type checking with code generation:

```bash
yarn check
```

This will run GraphQL code generation and then Astro's type checker.

### Code Formatting

Format your code with Prettier:

```bash
yarn format
```

Check if code is formatted correctly:

```bash
yarn format:check
```

### Git Hooks

This project uses [Lefthook](https://github.com/evilmartians/lefthook) and lint-staged to automatically format code before commits. The pre-commit hook will run Prettier on staged files.

Lefthook is configured in `lefthook.yml`.

### CI/CD

GitHub Actions workflow automatically runs on push and pull requests to check:
- Code formatting (via Prettier)
- Type checking (via `astro check`)
- GraphQL code generation

## Routes

- `/` - All articles (sorted by newest first)
- `/posts/[year]/[slug]/` - Individual article page (original language)
- `/posts/[year]/[slug]/[locale]/` - Translated article page
- `/tags` - All tags with article counts
- `/tag/[tag]` - Articles filtered by tag
- `/about` - About page with actor bio
- `/sitemap-index.xml` - Automatically generated sitemap
- `/robots.txt` - Robots.txt with sitemap reference

## Multi-language Support

Articles with multiple language versions have separate URLs for each translation. The system automatically:

- Creates separate pages for each language at `/posts/[year]/[slug]/[locale]/`
- Shows the original language at `/posts/[year]/[slug]/`
- Filters out articles that are currently being translated (`beingTranslated: true`)
- Provides language switcher links on each page
- Shows the original language with an "(Original)" label
- Displays which language a translation was translated from
- Includes proper `hreflang` tags for SEO

When viewing an article, readers can see all available language versions and switch between them using the language links at the top of the page.

## Configuration

### Site URL

Set your site URL in `astro.config.mjs` for proper sitemap generation:

```javascript
export default defineConfig({
  site: "https://yourdomain.com",
  // ...
});
```

This is required for the sitemap integration to generate absolute URLs.

### GraphQL Endpoint

Set the GraphQL endpoint URL in your environment variables:

```env
GRAPHQL_ENDPOINT=https://hackers.pub/graphql
```

### Visibility Levels

The `MINIMUM_VISIBILITY` setting controls which articles are displayed:

- `PUBLIC` - Only public articles (default)
- `UNLISTED` - Public and unlisted articles
- `FOLLOWERS` - Public, unlisted, and followers-only articles
- `DIRECT` - All articles

### Site Configuration

Edit `src/config.ts` to customize:

```typescript
export const siteConfig = {
  graphqlEndpoint:
    import.meta.env.GRAPHQL_ENDPOINT || "https://hackers.pub/graphql",
  handle: import.meta.env.HACKERSPUB_HANDLE || "user",
  minimumVisibility: (import.meta.env.MINIMUM_VISIBILITY || "PUBLIC") as
    | "PUBLIC"
    | "UNLISTED"
    | "FOLLOWERS"
    | "DIRECT",
  title: import.meta.env.SITE_TITLE || "My Blog",
  description:
    import.meta.env.SITE_DESCRIPTION || "A blog powered by Hackers' Pub",
} as const;
```

## Styling

The template uses Tailwind CSS with the Typography plugin (`@tailwindcss/typography`) to properly style HTML content from articles. The `prose` class automatically applies beautiful typographic defaults to:

- Headings (h1-h6)
- Paragraphs
- Lists (ul, ol)
- Links
- Code blocks
- Blockquotes
- Tables
- And more

You can customize the typography styles in `tailwind.config.mjs`.

## Tech Stack

- [Astro](https://astro.build) - Static Site Generator
- [React](https://react.dev) - UI components (for client-side interactivity)
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen) - Type-safe GraphQL client
- [graphql-request](https://github.com/jasonkuhrt/graphql-request) - GraphQL client

## License

MIT
