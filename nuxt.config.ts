// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxthub/core",
    "nuxt-auth-utils",
  ],
  css: ["~/assets/css/main.css"],
  hub: {
    db: "sqlite",
  },
});