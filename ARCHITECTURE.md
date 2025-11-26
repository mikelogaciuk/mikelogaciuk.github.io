# Architecture Documentation

## Project Overview

This is a personal blog application built with **Nuxt 3** and **Nuxt Content**, designed to be deployed on GitHub Pages. The project follows a modern JAMstack architecture with static site generation capabilities, optimized for content-focused websites with markdown-based posts.

**Tech Stack:**

- **Framework:** Nuxt 4.x with Vue 3.5
- **Content Management:** @nuxt/content 3.6
- **Styling:** TailwindCSS 4.x + DaisyUI 5.0
- **UI Components:** @nuxt/ui 3.3
- **Icons:** @nuxt/icon 1.15 with multiple icon sets
- **Testing:** Vitest 3.x with @nuxt/test-utils
- **Deployment:** gh-pages to GitHub Pages

---

## Architecture Principles

### 1. **Content-First Architecture**

The application is built around content management using Nuxt Content v3, enabling:

- Markdown-based blog posts with frontmatter metadata
- File-system based routing
- Syntax highlighting with Shiki (25+ programming languages)
- Type-safe content queries

### 2. **Component-Based Design**

Vue 3 Composition API with TypeScript for type safety and maintainability.

### 3. **Static Site Generation (SSG)**

Configured for pre-rendering all routes at build time, optimized for GitHub Pages deployment.

### 4. **Responsive & Accessible**

Mobile-first design with TailwindCSS utilities and DaisyUI components.

---

## Project Structure

```shell
mikelogaciuk.github.io/
├── app/                          # Application source code
│   ├── app.vue                   # Root Vue component (NuxtLayout + NuxtPage)
│   ├── assets/
│   │   └── app.css               # Global styles (TailwindCSS + DaisyUI config)
│   ├── components/               # Vue components
│   │   ├── AppHeaderComponent.vue
│   │   ├── AppMainComponent.vue
│   │   ├── PostsListViewerComponent.vue
│   │   ├── TimeLineComponent.vue
│   │   └── TimeLineMiddleSvgComponent.vue
│   ├── helpers/                  # Utility functions
│   │   └── badgeMapper.ts        # Badge randomization logic
│   ├── layouts/
│   │   └── default.vue           # Default layout wrapper
│   └── pages/                    # File-based routing
│       ├── index.vue             # Home page (skills & profile)
│       ├── about.vue             # About page
│       └── posts/
│           ├── index.vue         # Blog listing page
│           ├── [slug].vue        # Dynamic post detail page
│           └── tag/
│               └── [tag].vue     # Tag filter page
├── content/                      # Content management
│   ├── drafts/                   # Draft posts (not published)
│   │   └── rust-syntax.md
│   └── posts/                    # Published blog posts (25+ articles)
│       ├── core-networking-for-devops.md
│       ├── ets-w-exlirze.md
│       └── ... (22 more posts)
├── public/                       # Static assets
│   ├── robots.txt
│   └── img/fullstack/
├── server/api/                   # Server API routes (currently minimal)
├── tests/                        # Test suite
│   └── core.nuxt.spec.ts
├── nuxt.config.ts                # Nuxt configuration
├── content.config.ts             # Content collection schema
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Test configuration
├── eslint.config.mjs             # ESLint configuration
├── Dockerfile                    # Multi-stage Docker build
└── package.json                  # Dependencies & scripts
```

---

## Core Components

### Application Entry Point

#### `app/app.vue`

Root component that initializes the Nuxt application structure:

```vue
<NuxtLayout>
  <NuxtPage />
</NuxtLayout>
```

### Layouts

#### `app/layouts/default.vue`

Global layout providing consistent structure across all pages:
- **AppHeaderComponent:** Site navigation
- **AppMainComponent:** Main content wrapper with responsive padding
- **Structure:** Flexbox column layout with full viewport height

### Pages

#### `app/pages/index.vue`

**Home/Landing Page**

- Personal introduction (Michał Logaciuk - Senior DevOps Engineer)
- Specialization areas (DataOps, DevOps, Data Analysis, Back-End)
- Skills showcase with randomized color badges (35+ skills)
- Skills are clickable and link to tag-filtered post pages
- Fully responsive design

#### `app/pages/posts/index.vue`

**Blog Posts Listing**

- Fetches all posts from content collection
- Orders by date (descending)
- Renders `PostsListViewerComponent`

#### `app/pages/posts/[slug].vue`

**Individual Post Detail Page**

- Dynamic route for each blog post
- Displays post metadata (title, date, tags)
- Renders markdown content with `ContentRenderer`
- Tag badges with random colors
- Back navigation to posts list

#### `app/pages/posts/tag/[tag].vue`

**Tag-Filtered Posts**

- Dynamic filtering by tag parameter
- Uses same listing component architecture

### Components

#### `PostsListViewerComponent.vue`

**Purpose:** Unified blog post list renderer with filtering
**Features:**

- Language filter (Polish/English) via query params
- Displays post title, date, and summary
- Fully responsive with mobile-first design
- Client-side filtering logic

**Props:**

```typescript
interface Post {
  id: string | number;
  path: string;
  title: string;
  date: string;
  summary: string;
  language?: string;
  draft?: boolean;
}
```

#### `AppHeaderComponent.vue`

Navigation header (implementation details not shown in context)

#### `AppMainComponent.vue`

Main content wrapper with responsive padding

#### `TimeLineComponent.vue` & `TimeLineMiddleSvgComponent.vue`

Timeline visualization components (possibly for about page)

### Helpers

#### `helpers/badgeMapper.ts`

**Purpose:** Badge color randomization for tags and skills
**Functions:**

- `randomBadge()`: Returns random badge color class
- `mapBadges(data: string[])`: Maps array of items to badge objects

**Badge Colors:** accent, primary, secondary, info, success, warning, error

---

## Content Management

### Content Configuration (`content.config.ts`)

Defines the blog post schema using Zod for type safety:

```typescript
collections: {
  blog: defineCollection({
    type: "page",
    source: "posts/*.md",
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.string(),
      tags: z.array(z.string().optional()),
      language: z.string(),
    }),
  }),
}
```

### Post Structure

All posts located in `content/posts/` follow this frontmatter format:

```yaml
---
title: Post Title
description: Optional description
date: 2023-10-01
tags: [tag1, tag2, tag3]
language: en | pl
---

# Post Content (Markdown)
```

**Current Content:**

- 25+ published posts covering DevOps, programming languages (Elixir, Rust, Go, Python), SRE, and more
- Bilingual content (Polish & English)
- Topics: Elixir, Rust, Go, JavaScript, Python, DevOps tools, networking, security scanning

### Syntax Highlighting

Configured in `nuxt.config.ts` with **Shiki** using `rose-pine-moon` theme:

**Supported Languages (25+):**

- System: bash, shell, powershell, dockerfile
- Backend: python, ruby, elixir, go, rust, crystal, php, java, swift, dart
- Functional: haskell, fsharp, scala
- Frontend: js, ts, vue, html, css
- Data: sql, plsql, json, yaml, toml
- Markup: md, mdc

---

## Styling Architecture

### TailwindCSS + DaisyUI Integration

#### `app/assets/app.css`

Global stylesheet with:

1. **TailwindCSS Import:** `@import 'tailwindcss'`
2. **Typography Plugin:** `@tailwindcss/typography` for markdown rendering
3. **DaisyUI Plugin:** UI component library with `nord` and `sunset` themes
4. **Custom Font:** JetBrains Mono as default sans-serif
5. **Custom Badge Classes:** `.badger` with 7 color variants matching DaisyUI palette

**Typography Customization:**

```css
.prose h1 { @apply text-4xl no-underline; }
.prose h2 { @apply text-3xl no-underline; }
.prose h3 { @apply text-2xl no-underline; }
.prose a { @apply no-underline; }
```

**Badge System:**

- Base: `.badger` (px-3, py-1, rounded-lg)
- Variants: `.badger-{accent,primary,secondary,info,success,warning,error}`

---

## Configuration Files

### `nuxt.config.ts`

**Key Settings:**

- **App Head:** Site title, meta description
- **Dev Tools:** Enabled
- **CSS:** Global app.css import
- **Modules:** content, icon, fonts, eslint, ui, test-utils
- **Vite Plugin:** TailwindCSS integration
- **Content Highlighting:** Shiki with custom theme and 25+ languages

### `content.config.ts`

Defines content collections with Zod schema validation for type-safe queries.

### `tsconfig.json`

References Nuxt-generated TypeScript configurations:

- `.nuxt/tsconfig.app.json`
- `.nuxt/tsconfig.server.json`
- `.nuxt/tsconfig.shared.json`
- `.nuxt/tsconfig.node.json`

---

## Build & Deployment

### Docker Support

#### Multi-Stage Dockerfile

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
- Install dependencies (frozen lockfile)
- Copy source code
- Build with NODE_OPTIONS=--max-old-space-size=3072

# Stage 2: Production
FROM node:20-alpine AS production
- Copy build output (.output/)
- Optimized for deployment
```

### NPM Scripts

```json
"build": "nuxt build",           // Production build
"dev": "nuxt dev",               // Development server
"generate": "nuxt generate",     // Static site generation
"preview": "nuxt preview",       // Preview production build
"test": "vitest",                // Run tests
"testci": "vitest --run",        // CI test mode
"deploy": "gh-pages -d dist"     // Deploy to GitHub Pages
```

---

## Testing Strategy

### Test Setup

- **Framework:** Vitest 3.x
- **Utils:** @nuxt/test-utils, @vue/test-utils
- **Environment:** happy-dom (lightweight DOM simulation)
- **E2E Support:** playwright-core

**Test File:** `tests/core.nuxt.spec.ts`

---

## Data Flow

### Content Query Pattern

```typescript
// Fetch single post by slug
const { data: post } = await useAsyncData(`posts-${slug}`, () => {
  return queryCollection("blog").path(`/posts/${slug}`).first();
});

// Fetch all posts ordered by date
const allPosts = await queryCollection("blog")
  .order("date", "DESC")
  .all();
```

### Component Data Flow

1. **Page Components** fetch data using `queryCollection()`
2. **Data passed as props** to child components
3. **Presentational components** render UI
4. **Helper functions** transform data (e.g., badge mapping)

---

## Routing Architecture

### File-Based Routing

Nuxt automatically generates routes from `app/pages/` structure:

```shell
/                     → pages/index.vue
/about                → pages/about.vue
/posts                → pages/posts/index.vue
/posts/:slug          → pages/posts/[slug].vue
/posts/tag/:tag       → pages/posts/tag/[tag].vue
```

### Dynamic Routes

- `[slug].vue` - Dynamic post slugs matched from content files
- `[tag].vue` - Dynamic tag filtering

### Query Parameters

- `/posts?lang=pl` - Language filtering via `route.query.lang`

---

## Key Features

### 1. **Bilingual Support**

- Posts tagged with `language: en | pl`
- Client-side filtering in `PostsListViewerComponent`

### 2. **Tag System**

- Multiple tags per post
- Clickable badges linking to filtered views
- Randomized badge colors for visual variety

### 3. **Responsive Design**

- Mobile-first TailwindCSS approach
- Breakpoints: `sm:`, responsive padding, text sizing
- Example: `text-3xl sm:text-5xl` for scalable typography

### 4. **SEO Optimization**

- Meta tags in `nuxt.config.ts`
- `robots.txt` in public directory
- Static site generation for faster loading

### 5. **Developer Experience**

- TypeScript throughout
- ESLint configuration
- Vitest for unit testing
- Hot module replacement in dev mode

---

## Dependency Management

### Core Dependencies

- **nuxt:** 4.2.0 - Framework
- **@nuxt/content:** 3.6.3 - CMS
- **@nuxt/ui:** 3.3.0 - UI components
- **vue:** 3.5.18 - UI framework
- **tailwindcss:** 4.1.11 - Styling
- **daisyui:** 5.0.50 - Component library

### Development Tools

- **vitest:** Testing
- **eslint:** Linting
- **@nuxt/test-utils:** Nuxt-specific test utilities
- **gh-pages:** Deployment utility

### Icon Sets

- @iconify-json/catppuccin
- @iconify-json/devicon
- @iconify-json/logos
- @iconify-json/line-md
- @iconify-json/solar

---

## Deployment Architecture

### GitHub Pages Deployment

1. **Build Process:**
2.
   ```bash
   npm run generate  # Generates static files to .output/public/
   ```

3. **Deployment:**
4.
   ```bash
   npm run deploy    # Pushes dist/ to gh-pages branch
   ```

5. **Static Output:**
   - Pre-rendered HTML for all routes
   - Optimized assets (JS, CSS, images)
   - Client-side hydration for interactivity

### Environment Configuration

- **Node Version:** 20 (Alpine in Docker)
- **Memory Allocation:** 3072MB for builds (`NODE_OPTIONS`)

---

## Performance Considerations

1. **Static Site Generation:** Eliminates server response time
2. **TailwindCSS Purging:** Removes unused styles in production
3. **Code Splitting:** Nuxt automatically splits routes
4. **Lazy Loading:** Components loaded on-demand
5. **Font Optimization:** @nuxt/fonts with JetBrains Mono

---

## Security Features

- **Content Security:** Markdown sanitization via Nuxt Content
- **Dependency Management:** Frozen lockfile for reproducible builds
- **Static Deployment:** No server-side attack surface

---

## Future Considerations

### Potential Enhancements

1. **Search Functionality:** Full-text search across posts
2. **RSS Feed:** Auto-generate from content collection
3. **Dark Mode Toggle:** Manual theme switching (DaisyUI supports it)
4. **Comments System:** Integration with Giscus or similar
5. **Analytics:** Privacy-friendly tracking
6. **Image Optimization:** @nuxt/image module
7. **Internationalization:** Proper i18n module instead of query params

### Scalability

- Current architecture scales well for 100s of posts
- Content collection queries are efficient
- Static generation keeps performance consistent

---

## Development Workflow

1. **Local Development:**
   ```bash
   npm run dev           # Start dev server at http://localhost:3000
   ```

2. **Write Content:**
   - Create markdown file in `content/posts/`
   - Add frontmatter with required schema fields
   - Preview in browser

3. **Testing:**
   ```bash
   npm run test          # Run unit tests
   ```

4. **Build & Deploy:**
   ```bash
   npm run generate      # Generate static site
   npm run deploy        # Deploy to GitHub Pages
   ```

---

## Troubleshooting

### Common Issues

1. **Build Memory Errors:**
   - Already configured: `NODE_OPTIONS=--max-old-space-size=3072`

2. **Content Not Updating:**
   - Restart dev server
   - Clear `.nuxt` cache directory

---

## Contact & Maintainership

**Repository:** mikelogaciuk.github.io
**Owner:** mikelogaciuk
**License:** MIT

---

## References

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Nuxt Content Documentation](https://content.nuxtjs.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [DaisyUI Components](https://daisyui.com/)
- [Shiki Syntax Highlighter](https://shiki.style/)
