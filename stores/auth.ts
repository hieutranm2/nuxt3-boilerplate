import { defineStore } from 'pinia'

interface AuthUser {
  id: string
  name: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    login() {
      this.user = { id: '1', name: 'John Doe' }
    },
    async logout() {
      this.user = null
      navigateTo('/login')
    },
  },
})
