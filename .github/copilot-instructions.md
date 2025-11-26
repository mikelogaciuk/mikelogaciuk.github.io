# GitHub Copilot Instructions

## Project Context

This is a personal blog built with **Nuxt 3** and **@nuxt/content**, deployed to GitHub Pages. The codebase uses Vue 3 Composition API, TypeScript, TailwindCSS 4.x, and DaisyUI 5.x for styling.

---

## Core Principles

### 1. **Content-First Approach**

- All blog posts are markdown files in `content/posts/`
- Never hard-code content in Vue components
- Always use `queryCollection("blog")` for fetching posts
- Respect the content schema defined in `content.config.ts`

### 2. **Type Safety**

- Use TypeScript for all new code
- Define interfaces for props and data structures
- Leverage Zod schema validation for content
- Import types from Vue and Nuxt properly

### 3. **Composition API Only**

- Use `<script setup lang="ts">` in all Vue components
- Prefer `ref()` and `computed()` over Options API
- Use `useAsyncData()` for data fetching
- Use `useRoute()` and `useRouter()` for routing

### 4. **Responsive Design**

- Mobile-first approach with TailwindCSS
- Always include responsive variants: `text-base sm:text-lg md:text-xl`
- Test layouts at mobile (default), tablet (sm:), and desktop (md:, lg:) breakpoints
- Use flexible layouts with `flex`, `grid`, and proper spacing

---

## Code Style Guidelines

### Vue Components

#### Component Structure

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed } from 'vue';

// 2. Props/Emits definitions
interface Props {
  posts: Post[];
}
defineProps<Props>();

// 3. Composables
const route = useRoute();

// 4. Reactive state
const selectedTag = ref<string>('');

// 5. Computed properties
const filteredPosts = computed(() => {
  // logic here
});

// 6. Functions
const handleClick = () => {
  // logic here
};
</script>

<template>
  <!-- Keep template logic simple and readable -->
</template>

<style>
/* Prefer TailwindCSS utility classes over custom CSS */
</style>
```

#### Naming Conventions

- **Components:** PascalCase with descriptive suffixes (e.g., `PostsListViewerComponent.vue`, `AppHeaderComponent.vue`)
- **Files:** Same as component name
- **Props:** camelCase
- **Events:** kebab-case in templates, camelCase in TypeScript
- **Composables:** camelCase starting with "use" (e.g., `useFilteredPosts`)

### TypeScript

#### Interface Definitions

```typescript
// Define clear interfaces for data structures
interface Post {
  id: string | number;
  path: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  language?: string;
  draft?: boolean;
}
```

#### Avoid `any` Type

- Always provide specific types
- Use `unknown` when type is truly unknown and narrow it
- Use generic types when appropriate

### Content Queries

#### Standard Patterns

```typescript
// Fetch all posts (ordered)
const allPosts = await queryCollection('blog').order('date', 'DESC').all();

// Fetch single post by slug
const { data: post } = await useAsyncData(`posts-${slug}`, () => {
  return queryCollection('blog').path(`/posts/${slug}`).first();
});

// Filter by tag (use where clause if available)
const taggedPosts = await queryCollection('blog')
  .where('tags', 'contains', tagName)
  .all();
```

---

## Styling Guidelines

### TailwindCSS Usage

#### Responsive Design Pattern

```vue
<!-- Always consider mobile first -->
<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Title
</h1>

<div class="px-2 py-2 sm:px-4 sm:py-4 md:px-6 md:py-6">
  Content
</div>
```

#### Common Patterns

- **Spacing:** Use consistent spacing scale (2, 4, 6, 8, 10, 12)
- **Typography:** Use semantic text sizes (text-sm, text-base, text-lg, text-xl, text-2xl, etc.)
- **Colors:** Prefer DaisyUI color classes over custom colors
- **Flexbox:** `flex flex-col items-center justify-center` for centered layouts

### DaisyUI Components

#### Badge System

```vue
<!-- Use the custom .badger classes for tags/skills -->
<span :class="`badger badger-${badgeColor}`">
  {{ tag }}
</span>
```

**Available badge colors:**

- `badger-accent`
- `badger-primary`
- `badger-secondary`
- `badger-info`
- `badger-success`
- `badger-warning`
- `badger-error`

#### Theme Classes

- Use `bg-base-100`, `bg-base-200` for backgrounds
- Use semantic color names: `text-primary`, `btn-secondary`, etc.
- Current themes: `nord`, `sunset` (default)

### Custom CSS

Only add custom CSS when:

1. Styling markdown content (`.prose` overrides)
2. Creating reusable utility classes
3. TailwindCSS utilities are insufficient

Place custom CSS in `app/assets/app.css` using `@apply` directive:

```css
.custom-class {
  @apply px-4 py-2 rounded-lg bg-primary;
}
```

---

## Component Development

### Creating New Components

1. **Location:** Place in `app/components/`
2. **Naming:** Use descriptive PascalCase with `Component` suffix
3. **Props:** Always use TypeScript interfaces
4. **Exports:** Use `defineProps<T>()` for type-safe props

#### Example Component Template

```vue
<script setup lang="ts">
interface Props {
  title: string;
  items: string[];
  isLoading?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [item: string];
}>();

const handleClick = (item: string) => {
  emit('select', item);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <ul v-if="!isLoading" class="list-none">
      <li v-for="item in items" :key="item" @click="handleClick(item)">
        {{ item }}
      </li>
    </ul>
    <div v-else>Loading...</div>
  </div>
</template>
```

### Component Responsibilities

- **Pages:** Data fetching and routing logic
- **Components:** Presentation and user interactions
- **Layouts:** Global structure and navigation
- **Helpers:** Pure utility functions without side effects

---

## Content Management

### Creating Blog Posts

#### File Structure

```
content/posts/your-post-slug.md
```

#### Required Frontmatter

```yaml
---
title: Your Post Title
description: Optional brief description for SEO
date: 2025-11-26
tags: [tag1, tag2, tag3]
language: en
---
# Your Post Title

Content starts here...
```

**Rules:**

- `title`: Required, plain text
- `date`: Required, ISO format (YYYY-MM-DD)
- `tags`: Required array, use lowercase with hyphens
- `language`: Required, either `en` or `pl`
- `description`: Optional, used for meta tags

### Supported Markdown Features

1. **Headings:** H1-H6 (H1 for title, start content with H2)
2. **Code blocks:** Fenced with language identifier
3. **Lists:** Ordered and unordered
4. **Links:** Standard markdown links
5. **Images:** Place in `public/img/` and reference as `/img/filename.png`
6. **Emphasis:** Bold, italic, strikethrough

#### Code Block Example

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

### Syntax Highlighting

**Supported Languages:** bash, c, cpp, crystal, css, dart, dockerfile, elixir, fsharp, gleam, go, haskell, html, java, js, json, md, mdc, php, plsql, powershell, python, ruby, rust, scala, shell, sql, swift, toml, ts, vue, yaml

**Theme:** rose-pine-moon

When adding new languages:

1. Add to `langs` array in `nuxt.config.ts`
2. Ensure language is supported by Shiki

---

## Routing & Navigation

### File-Based Routing

**Automatic routes from `app/pages/`:**

```
pages/index.vue           → /
pages/about.vue           → /about
pages/posts/index.vue     → /posts
pages/posts/[slug].vue    → /posts/:slug
pages/posts/tag/[tag].vue → /posts/tag/:tag
```

### Dynamic Routes

#### Accessing Route Params

```typescript
// In [slug].vue
const route = useRoute();
const slug = route.params.slug;

// In [tag].vue
const tag = route.params.tag;
```

### Navigation

#### NuxtLink Usage

```vue
<!-- Internal navigation -->
<NuxtLink to="/posts">All Posts</NuxtLink>

<!-- Dynamic routes -->
<NuxtLink :to="`/posts/${post.path}`">
  {{ post.title }}
</NuxtLink>

<!-- With query params -->
<NuxtLink :to="{ path: '/posts', query: { lang: 'en' } }">
  English Posts
</NuxtLink>
```

---

## Data Fetching

### useAsyncData Pattern

```typescript
// Use for server-side data fetching
const { data, pending, error, refresh } = await useAsyncData(
  'unique-key',
  () => queryCollection("blog").all()
);

// Access with optional chaining
<div v-if="data">{{ data.title }}</div>
```

### Key Naming Convention

- Use descriptive, unique keys
- Include dynamic params: `posts-${slug}`
- Prefix with feature: `blog-posts-list`, `blog-post-detail`

### Error Handling

```typescript
const { data: post, error } = await useAsyncData(`post-${slug}`, () =>
  queryCollection('blog').path(`/posts/${slug}`).first()
);

if (error.value) {
  // Handle error (show 404, redirect, etc.)
}
```

---

## Helper Functions

### Location

Place utility functions in `app/helpers/` directory.

### Guidelines

1. **Pure functions:** No side effects
2. **Single responsibility:** One function, one purpose
3. **Type safety:** Input and output types defined
4. **Export:** Named exports for tree-shaking

### Example Helper

```typescript
// app/helpers/dateFormatter.ts
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isRecent = (dateString: string, days: number = 30): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff < days * 24 * 60 * 60 * 1000;
};
```

---

## Testing

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ComponentName from '~/components/ComponentName.vue';

describe('ComponentName', () => {
  it('renders properly', () => {
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
      },
    });

    expect(wrapper.text()).toContain('Test Title');
  });

  it('emits event on click', async () => {
    const wrapper = mount(ComponentName);
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('select')).toBeTruthy();
  });
});
```

### Testing Guidelines

1. **Test user interactions**, not implementation details
2. **Mock external dependencies** (API calls, navigation)
3. **Use meaningful assertions**
4. **Keep tests simple and readable**
5. **One concept per test**

---

## Performance Best Practices

### Code Splitting

- Let Nuxt handle automatic code splitting
- Avoid importing large libraries in components
- Use dynamic imports for heavy components:

```typescript
const HeavyComponent = defineAsyncComponent(
  () => import('~/components/HeavyComponent.vue')
);
```

### Image Optimization

- Place images in `public/img/`
- Use appropriate formats (WebP for photos, SVG for icons)
- Consider lazy loading for below-the-fold images
- Provide width/height attributes to prevent layout shift

### Content Optimization

- Keep markdown files under 100KB
- Split very long posts into series
- Use appropriate heading hierarchy (H2 > H3 > H4)

### Bundle Size

- Avoid importing entire libraries (import only what's needed)
- Use icon collections selectively
- Review bundle analyzer output before major releases

---

## Configuration Changes

### Adding New Nuxt Modules

1. Install the module: `npm install @nuxt/module-name`
2. Add to `nuxt.config.ts` modules array:

```typescript
modules: [
  '@nuxt/content',
  '@nuxt/module-name', // Add here
],
```

3. Configure module-specific options if needed

### Content Schema Updates

When adding new frontmatter fields:

1. Update `content.config.ts`:

```typescript
schema: z.object({
  title: z.string(),
  date: z.string(),
  newField: z.string().optional(), // Add here
}),
```

2. Update TypeScript interfaces in components
3. Update existing posts or make field optional

### TailwindCSS Customization

Add customizations to `app/assets/app.css`:

```css
@theme {
  --color-custom: #hex-color;
  --font-custom: 'Font Name', sans-serif;
}
```

---

## Common Tasks

### Adding a New Page

1. Create file in `app/pages/`: `new-page.vue`
2. Use layout:

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>

<template>
  <div>
    <!-- Page content -->
  </div>
</template>
```

3. Add navigation link in header component

### Adding a New Tag Filter

Tags are automatically available from post frontmatter. To link to a tag:

```vue
<NuxtLink :to="`/posts/tag/${tagName}`">
  {{ tagName }}
</NuxtLink>
```

### Implementing Language Toggle

Language filtering is done via query params:

```vue
<NuxtLink :to="{ path: '/posts', query: { lang: 'en' } }">
  English
</NuxtLink>
```

Filter in component:

```typescript
const language = computed(() => route.query.lang || '');
const filtered = posts.filter((p) => p.language === language.value);
```

### Adding External Links to Header

Edit `AppHeaderComponent.vue` and add:

```vue
<a href="https://github.com/username" target="_blank" rel="noopener">
  GitHub
</a>
```

---

## Deployment

### Pre-Deployment Checklist

1. **Test locally:** `npm run dev`
2. **Run tests:** `npm run test`
3. **Lint code:** `npm run lint` (if configured)
4. **Build static site:** `npm run generate`
5. **Preview build:** `npm run preview`

### Build Process

```bash
# Generate static files
npm run generate

# Output directory: .output/public/
# This becomes the dist/ folder for deployment
```

### Deployment to GitHub Pages

```bash
npm run deploy
```

This pushes the `dist/` folder to the `gh-pages` branch.

### Environment Variables

Create `.env` file for local development:

```
# Add any environment variables here
NUXT_PUBLIC_SITE_URL=https://yourusername.github.io
```

Access in code:

```typescript
const siteUrl = useRuntimeConfig().public.siteUrl;
```

---

## Troubleshooting

### Common Issues

#### "Cannot find module" errors

- Run `npm install` to ensure all dependencies are installed
- Clear `.nuxt` cache: `rm -rf .nuxt`
- Restart dev server

#### Content not updating

- Restart dev server (`Ctrl+C` then `npm run dev`)
- Check frontmatter syntax (YAML formatting)
- Verify file is in `content/posts/` directory

#### Styling not applied

- Check TailwindCSS class names for typos
- Ensure `app.css` is imported in `nuxt.config.ts`
- Clear browser cache
- Verify DaisyUI theme classes are valid

#### Build memory errors

- Already configured with `NODE_OPTIONS=--max-old-space-size=3072`
- If still occurring, increase value in `Dockerfile`

#### Type errors in components

- Ensure TypeScript types are imported correctly
- Check `tsconfig.json` references are valid
- Run `npm run postinstall` to regenerate Nuxt types

### Getting Help

1. Check [Nuxt Documentation](https://nuxt.com/docs)
2. Review [Nuxt Content Documentation](https://content.nuxtjs.org/)
3. Search existing GitHub issues
4. Check `ARCHITECTURE.md` for project structure

---

## Git Workflow

### Commit Messages

Follow conventional commits format:

```
feat: add new blog post about Rust
fix: correct typo in header component
docs: update architecture documentation
style: improve mobile responsiveness
refactor: simplify badge mapping logic
test: add tests for post filtering
chore: update dependencies
```

### Branch Naming

- `content/topic` - New content or content updates
- `feature/feature-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/what-changed` - Documentation updates

---

## Security Considerations

### Content Security

- Never commit sensitive data (API keys, passwords)
- Sanitize user input if adding interactive features
- Nuxt Content automatically sanitizes markdown

### Dependencies

- Regularly update dependencies: `npm update`
- Check for vulnerabilities: `npm audit`
- Use `npm audit fix` for automatic fixes

### Environment Variables

- Never commit `.env` files
- Add `.env` to `.gitignore`
- Use GitHub Secrets for CI/CD variables

---

## Accessibility Guidelines

### Semantic HTML

- Use appropriate heading hierarchy (H1 > H2 > H3)
- Use `<nav>` for navigation
- Use `<main>` for main content
- Use `<article>` for blog posts

### ARIA Labels

```vue
<button aria-label="Close menu">
  <Icon name="close" />
</button>
```

### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Test tab order
- Provide focus styles (TailwindCSS includes these by default)

### Color Contrast

- Use DaisyUI semantic colors (automatically accessible)
- Test with contrast checker for custom colors
- Don't rely solely on color to convey information

---

## Code Review Checklist

Before submitting changes:

- [ ] Code follows TypeScript and Vue best practices
- [ ] Components are properly typed
- [ ] Responsive design tested on mobile and desktop
- [ ] No console errors or warnings
- [ ] Content schema is respected
- [ ] New content includes required frontmatter
- [ ] Tests pass (`npm run test`)
- [ ] Build succeeds (`npm run generate`)
- [ ] No sensitive data committed
- [ ] Commit messages are descriptive
- [ ] Code is properly formatted

---

## Additional Resources

### Documentation

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Nuxt Content v3](https://content.nuxtjs.org/)
- [TailwindCSS v4](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools

- [Shiki Language Support](https://shiki.style/languages)
- [Shiki Themes](https://shiki.style/themes)
- [Iconify Icon Sets](https://icon-sets.iconify.design/)

---

## Contact

**Repository:** mikelogaciuk.github.io  
**Owner:** mikelogaciuk  
**License:** MIT

For questions about this codebase, refer to `ARCHITECTURE.md` for detailed technical documentation.
