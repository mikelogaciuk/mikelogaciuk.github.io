# Personal Blog

## About

Modern personal portfolio and blog for `Github Pages` featuring a full-page scroll narrative layout, built with Nuxt 3 and Nuxt Content.

**Version:** 2.0.0
**Tech Stack:** Nuxt 4.x, Vue 3, TypeScript, TailwindCSS 4.x, DaisyUI 5.x

## 📖 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Comprehensive technical documentation covering project structure, components, configuration, and development guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and release notes
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - GitHub Copilot code generation guidelines and best practices

## 🚀 Modules used

The blog uses the following Nuxt.js modules:

- [@nuxt/content](https://content.nuxtjs.org/) - for content management
- [@nuxt/icon](https://nuxt.com/modules/icon) - for icons
- [@nuxt/fonts](https://nuxt.com/modules/fonts) - for fonts
- [@nuxt/eslint](https://nuxt.com/modules/eslint) - for linting
- [@nuxt/ui](https://nuxt.com/modules/ui) - for UI components

Additionally, it uses the following packages:

- [daisyui](https://daisyui.com/) - for UI components
- [tailwindcss](https://tailwindcss.com/) - for styling
- [prettier](https://prettier.io/) - for code formatting

It also has enabled markdown highlighting with [shiki](https://shiki.matsu.io/) for languages like `js`, `ts`, `vue`, `html`, and `css`, `ruby`, `python`, `elixir` and others.

The config can be found in `nuxt.config.ts` and `content.config.ts`.

## 📦 Installation

In order to use it, as your template just clone the repo and install the dependencies:

```shell
npx nuxi init my-project -t https://codeload.github.com/mikelogaciuk/nuxlee/tar.gz/main
cd my-project && npm i
```

## 🏃 Running locally

To run the project locally, use:

```shell
npm run dev
```

## 📝 Writing posts

To write a new post, create a new markdown file in the `content/posts` directory. The filename will be used as the slug for the post.

You can use the following frontmatter to define the post metadata:

```markdown
---
title: The title
date: 2023-10-01
tags: [nuxt, blog, starter]
language: pl
---

// Your content here
```

The title is taken from the `h1` in the Markdown at the beginning of the file.

## 💊 Tests

For tests use [Vitest](https://vitest.dev/).

It should work out of the box, with:

```shell
npm run test
```

If not, type:

```shell
npm i --save-dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core
```

## 🏗️ Project Structure

```plaintext
├── app/                  # Application source code
│   ├── components/       # Vue components
│   ├── pages/           # File-based routing
│   ├── layouts/         # Layout templates
│   └── helpers/         # Utility functions
├── content/             # Markdown content
│   ├── posts/          # Published blog posts (24+)
│   └── drafts/         # Draft content
├── tests/              # Vitest test suite
├── public/             # Static assets
└── dockerfiles/        # Docker configurations
```

For detailed architecture information, see [ARCHITECTURE.md](ARCHITECTURE.md)
(generated with Copilot).

## ✨ Acknowledgements

The v2.0.0 overhaul—including the modern full-page scroll architecture, typography normalization, and viewport-aware dynamic pagination—was designed and pair-programmed with the help of **Google Antigravity**.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
