# Personal Blog

## About

Minimalistic personal blog for `Github Pages`.

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
git clone https://github.com/mikelogaciuk/mikelogaciuk.github.io.git
npm ci
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
