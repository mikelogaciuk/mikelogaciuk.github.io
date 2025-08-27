// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  build: {
    parallel: true,
  },
  // ssr: true,
  // nitro: {
  //   preset: 'static',
  // },
  app: {
    head: {
      title: "Mike Logaciuk",
      meta: [
        {
          name: "description",
          content: "Personal blog",
        },
      ],
    },
  },
  compatibilityDate: "2025-08-01",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/test-utils/module",
  ],
  content: {
    build: {
      markdown: {
        highlight: {
          // Get the themes from here: https://shiki.style/themes
          theme: "catppuccin-mocha",
          // theme: "rose-pine",
          // Get the languages from here: https://shiki.style/languages
          langs: [
            "c",
            "cpp",
            "java",
            "ruby",
            "crystal",
            "python",
            "elixir",
            "json",
            "js",
            "ts",
            "html",
            "css",
            "vue",
            "shell",
            "mdc",
            "md",
            "yaml",
            "dockerfile",
            "gleam",
            "rust",
            "go",
            "bash",
            "php",
            "sql",
            "plsql",
            "haskell",
            "scala",
            "toml",
          ],
        },
      },
    },
  },
});
