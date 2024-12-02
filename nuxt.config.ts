// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@unocss/nuxt", "nuxt-auth-utils"],
  css: [
    '@/layouts/global.css' // Ruta al archivo CSS global
  ]
});