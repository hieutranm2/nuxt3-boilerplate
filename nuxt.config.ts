import { readFileSync } from 'fs'

export default defineNuxtConfig({
  ssr: false, // if ssr: true, please install firebase-admin @firebase/app-types
  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt', 'nuxt-vuefire'],
  imports: {
    dirs: ['stores'],
  },
  vuefire: {
    config: JSON.parse(readFileSync('./firebase.config.json', 'utf-8')),
    auth: true,
  },
})
