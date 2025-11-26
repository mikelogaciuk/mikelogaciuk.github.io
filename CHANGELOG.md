# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-11-26

### 🎉 Initial Release

This marks the first official release of the personal blog built with Nuxt 3 and Nuxt Content, ready for deployment to GitHub Pages.

### ✨ Features

#### Core Application

- **Nuxt 4.2.0** framework with Vue 3.5.18 and TypeScript support
- **Nuxt Content 3.6.3** for markdown-based content management
- **Static Site Generation (SSG)** optimized for GitHub Pages deployment
- **File-based routing** with automatic route generation from `app/pages/`
- **Composition API** with `<script setup lang="ts">` throughout the codebase

#### Content Management

- **25+ blog posts** covering DevOps, SRE, programming languages, and technical topics
- **Bilingual support** (English & Polish) with client-side language filtering
- **Zod schema validation** for type-safe content queries
- **Frontmatter metadata** (title, description, date, tags, language)
- **Syntax highlighting** with Shiki using `rose-pine-moon` theme
- **25+ programming languages** supported for code blocks (Python, Ruby, Elixir, Go, Rust, JavaScript, TypeScript, SQL, Bash, and more)

#### User Interface

- **TailwindCSS 4.1.11** for utility-first styling
- **DaisyUI 5.0.50** component library with `nord` and `sunset` themes
- **Theme toggle** for switching between nord and sunset themes
- **Mobile-first responsive design** with breakpoints (sm:, md:, lg:)
- **Custom badge system** with 7 color variants (accent, primary, secondary, info, success, warning, error)
- **JetBrains Mono** font integration via @nuxt/fonts

#### Pages & Components

- **Home page** (`/`) - Personal introduction with 35+ skills showcase
- **Blog listing** (`/posts`) - All posts ordered by date (descending)
- **Post detail** (`/posts/:slug`) - Individual post with markdown rendering
- **Tag filtering** (`/posts/tag/:tag`) - Filter posts by tags
- **About page** (`/about`) - Professional journey timeline and bio
- **Language filtering** via query parameters (`?lang=en` or `?lang=pl`)

#### Components

- `AppHeaderComponent` - Navigation with home, posts, about links and theme toggle
- `AppMainComponent` - Main content wrapper with responsive padding
- `PostsListViewerComponent` - Unified post list with language filtering
- `TimeLineComponent` - Career timeline visualization
- `TimeLineMiddleSvgComponent` - SVG decorations for timeline

#### Developer Experience

- **TypeScript** throughout with strict type checking
- **ESLint** configuration for code quality
- **Vitest 3.x** testing framework with @vue/test-utils
- **Hot Module Replacement (HMR)** for instant feedback during development
- **@nuxt/icon** with multiple icon sets (Catppuccin, Devicon, Logos, Line-MD, Solar)
- **Badge mapper helper** for randomized badge colors

#### Build & Deployment

- **Multi-stage Dockerfile** for optimized production builds
- **Docker support** with Node 20 Alpine base image
- **Memory optimization** with `NODE_OPTIONS=--max-old-space-size=3072`
- **gh-pages deployment** script for one-command publishing
- **Static site output** to `.output/public/` directory

#### Performance & SEO

- **Static site generation** eliminates server response time
- **Automatic code splitting** by Nuxt
- **TailwindCSS purging** removes unused styles in production
- **Meta tags** configured in `nuxt.config.ts`
- **robots.txt** for search engine crawling
- **Content sanitization** via Nuxt Content

#### Content Topics Covered

- **DevOps:** CI/CD, Infrastructure, Docker, Kubernetes, Terraform
- **Programming Languages:** Elixir (4 posts), Rust (2 posts), Go, Python, Ruby, Crystal, JavaScript, PHP
- **Data Engineering:** ETL, DataOps, SQL, PL/SQL
- **Functional Programming:** Monads, Monoids, Functors, Endofunctors
- **Systems:** Linux, Windows, Networking, SRE practices
- **Security:** Trivy, Semgrep, GitLab scanning
- **Tools:** Sentry, Prefect, Loco, Laravel, Rails

### 📁 Project Structure

```plaintext
├── app/
│   ├── components/        # 5 Vue components
│   ├── helpers/          # Badge mapping utilities
│   ├── layouts/          # Default layout
│   ├── pages/            # 4 main pages + dynamic routes
│   └── assets/           # Global CSS with TailwindCSS
├── content/
│   ├── posts/            # 24 published blog posts
│   └── drafts/           # Draft content
├── tests/                # Vitest test suite
├── public/               # Static assets and robots.txt
└── server/api/           # API routes (minimal)
```

### 🛠️ Configuration Files

- **nuxt.config.ts** - Nuxt configuration with modules and Shiki setup
- **content.config.ts** - Content collections with Zod schema
- **tsconfig.json** - TypeScript configuration
- **vitest.config.ts** - Test configuration
- **eslint.config.mjs** - ESLint rules
- **Dockerfile** - Multi-stage production build
- **package.json** - Dependencies and scripts

### 📚 Documentation

- **README.md** - Project overview, installation, and usage instructions
- **ARCHITECTURE.md** - Comprehensive technical documentation (350+ lines)
- **.github/copilot-instructions.md** - GitHub Copilot code generation guidelines (500+ lines)
- **LICENSE** - MIT License

### 🔧 NPM Scripts

```json
"dev": "nuxt dev"              // Start development server
"build": "nuxt build"          // Production build
"generate": "nuxt generate"    // Generate static site
"preview": "nuxt preview"      // Preview production build
"test": "vitest"               // Run tests
"testci": "vitest --run"       // CI test mode
"deploy": "gh-pages -d dist"   // Deploy to GitHub Pages
"postinstall": "nuxt prepare"  // Prepare Nuxt
```

### 📦 Dependencies

#### Core

- nuxt ^4.2.0
- vue ^3.5.18
- @nuxt/content ^3.6.3
- @nuxt/ui ^3.3.0
- tailwindcss ^4.1.11
- daisyui ^5.0.50

#### Nuxt Modules

- @nuxt/icon ^1.15.0
- @nuxt/fonts ^0.11.4
- @nuxt/eslint ^1.7.1
- @nuxt/test-utils ^3.19.2

#### Development

- vitest ^3.2.4
- @vue/test-utils ^2.4.6
- eslint ^9.34.0
- gh-pages ^6.3.0
- playwright-core ^1.55.0
- happy-dom ^20.0.10

#### Icon Sets

- @iconify-json/catppuccin ^1.2.11
- @iconify-json/devicon ^1.2.35
- @iconify-json/devicon-plain ^1.2.34
- @iconify-json/line-md ^1.2.8
- @iconify-json/logos ^1.2.5
- @iconify-json/solar ^1.2.2

### 🎨 Design System

#### Color Themes

- **Nord** - Cool, arctic color palette
- **Sunset** (default) - Warm, vibrant color palette

#### Typography

- **Font:** JetBrains Mono (monospace)
- **Prose styling:** Custom heading sizes, no underlines on links
- **Responsive text:** Mobile-first with sm:, md:, lg: breakpoints

#### Badge Colors

- Accent, Primary, Secondary, Info, Success, Warning, Error
- Randomized assignment for visual variety

### 🔒 Security

- **Content sanitization** via Nuxt Content
- **Frozen lockfile** for reproducible builds
- **No server-side attack surface** (static deployment)
- **Environment variable** best practices documented

### ♿ Accessibility

- **Semantic HTML** with proper heading hierarchy
- **Keyboard navigation** support
- **Focus styles** via TailwindCSS defaults
- **DaisyUI semantic colors** for contrast compliance

### 🌐 Deployment

- **Target:** GitHub Pages
- **Method:** gh-pages package pushing to `gh-pages` branch
- **Build output:** Static HTML, CSS, and JavaScript
- **Node version:** 20 (Alpine in Docker)

### 📝 Content Guidelines

#### Required Frontmatter

```yaml
title: string (required)
description: string (optional)
date: YYYY-MM-DD (required)
tags: array of strings (required)
language: "en" | "pl" (required)
```

#### Supported Features

- Headings (H1-H6)
- Code blocks with syntax highlighting
- Lists (ordered/unordered)
- Links and images
- Bold, italic, strikethrough

### 🧪 Testing

- **Framework:** Vitest with happy-dom
- **Test file:** `tests/core.nuxt.spec.ts`
- **CI support:** `npm run testci` for CI/CD pipelines

### 🐳 Docker Support

- **Multi-stage build** for optimized image size
- **Node 20 Alpine** base image

### 🚀 Performance

- **Static generation** for instant page loads
- **Code splitting** by route
- **TailwindCSS purging** in production
- **Lazy component loading** support
- **Font optimization** via @nuxt/fonts

### 📈 Future Enhancements (Planned)

- Search functionality across posts
- RSS feed generation
- Dark mode toggle (manual)
- Comment system integration
- Analytics integration
- Image optimization with @nuxt/image
- Full i18n support

### 🙏 Acknowledgments

- **Nuxt Team** - For the amazing framework
- **Nuxt Content** - For seamless markdown integration
- **TailwindCSS** - For utility-first styling
- **DaisyUI** - For beautiful components
- **Shiki** - For syntax highlighting

### 📊 Statistics

- **24 blog posts** published
- **1 draft** in progress
- **5 custom Vue components**
- **1 helper module**
- **4 main pages** + dynamic routes
- **25+ programming languages** supported
- **7 badge color variants**
- **2 themes** (nord, sunset)
- **35+ skills** showcased on home page

### 🔗 Links

- **Repository:** [mikelogaciuk.github.io](https://github.com/mikelogaciuk/mikelogaciuk.github.io)
- **Owner:** mikelogaciuk
- **License:** MIT
- **Branch:** content/new

---

## Release Notes

This version establishes the foundation for a modern, performant personal blog with excellent developer experience and content management capabilities. The architecture is designed to scale to hundreds of posts while maintaining fast build times and optimal performance.

### Breaking Changes

- None (initial release)

### Migration Guide

- None (initial release)

### Known Issues

- None reported

### Upgrade Path

- This is the initial release; no upgrade necessary

---

**Release Date:** November 26, 2025
**Status:** ✅ Stable
**Deployment:** GitHub Pages
**Maintainer:** Michał Logaciuk
