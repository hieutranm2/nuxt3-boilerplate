export default defineNuxtConfig({
  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt'],
  imports: {
    dirs: ['stores'],
  },
})
