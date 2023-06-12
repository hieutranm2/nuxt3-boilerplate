export default defineNuxtConfig({
  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt', 'nuxt-vuefire', '@nuxtjs/tailwindcss'],
  imports: {
    dirs: ['stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'skipHydrate'],
  },
  vuefire: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
      projectId: process.env.PROJECT_ID,
    },
    auth: true,
    admin: {},
  },
})
