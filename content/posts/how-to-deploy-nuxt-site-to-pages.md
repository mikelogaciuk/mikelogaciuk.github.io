---
title: How to deploy Nuxt static site to Github Pages?
date: 2025-09-01
tags: ["cicd", "ci", "cd", "devops", "sre", "devsecops", "gitops", "pipeline", "actions", "workflow"]
language: "en"
---

![Photo](/img/gh-actions-post.png)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [📃 Introduction](#-introduction)
- [🛠️ Prerequisites](#️-prerequisites)
- [🚀 Continuous Deployment (CD)](#-continuous-deployment-cd)
- [📦 Setting up the repository](#-setting-up-the-repository)
- [❤️ Continuous Integration (CI)](#️-continuous-integration-ci)
- [🔎 Sources](#-sources)

## 📃 Introduction

In this guide, we will walk through the steps to deploy a Nuxt.js static site to GitHub Pages using GitHub Actions. This process will help you automate the deployment of your site whenever you push changes to your repository.

First of all, do not rely on the `Copilot` at this moment for from start - to finish generation, since the Nuxt 4 came out few weeks ago and the original suggestions do not work.

## 🛠️ Prerequisites

First of all, I assume you have a GitHub repository set up for your Nuxt.js project and that you have already pushed your code to this repository.

In order to add simple GitHub Actions workflow for deploying your Nuxt.js site to GitHub Pages, you need to create a `.github/workflows/deploy.yml` file in your repository:

```shell
git branch -c dev/cicd && git checkout dev/cicd && git push -u origin dev/cicd
mkdir -p .github/workflows && touch .github/workflows/deploy.yml

# Use `ni` if using Powershell for a directory creation
```

## 🚀 Continuous Deployment (CD)

Then just copy & paste the code below:

```yml
name: Deploy to GitHub Pages
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm install
      - run: npx nuxt build --preset github_pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./.output/public
  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 📦 Setting up the repository

Then in your repository settings on `Github`, make sure that `Build and deployment` is set to `GitHub Pages`.

You can find this one navigating to your repository's **Settings** > **Pages** section.

Then protect the `main` branch by going to **Settings** > **Branches** and adding a branch protection rule like:

- Protect matching branches: `main`.
- Require pull request reviews before merging.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.

Then push the code:

```shell
git add . && git commit -m "Setup GitHub Actions for Nuxt.js deployment" && git push
```

Once you commit changes to the dev branch, create a pull request to merge your changes into the main branch.

After merging, the GitHub Actions workflow will automatically run and deploy your Nuxt.js site to GitHub Pages.

## ❤️ Continuous Integration (CI)

In order to add some pure Continuous Integration (CI) workflow for your Nuxt.js project, you need to create a `.github/workflows/ci.yml` file in your repository:

```shell
mkdir -p .github/workflows && touch .github/workflows/ci.yml
```

Then just copy & paste the code below:

```yml
name: CI Workflow

on:
  ### You can enable this to run on push, but since your `main` is already  protected
  ### and since the tests will run on each MR/PR, the reasoning for this is limited.
  # push:
  #   branches:
  #     - "**"
  pull_request:
    branches:
      - "**"

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run testci
```

**But make sure that you have the necessary tests in place to validate your changes**.

In my case, I have a `testci` script defined in my `package.json` that runs all the tests.

## 🔎 Sources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Nuxt.js Documentation](https://nuxtjs.org/docs)
