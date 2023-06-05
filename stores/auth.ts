import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const user = useCurrentUser()
    return {
      user,
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async login(email: string, password: string) {
      const auth = useFirebaseAuth()
      if (!auth) {
        throw new Error('Firebase Auth is not initialized')
      }
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (error: any) {
        const errorCode = error.code
        if (
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/user-not-found' ||
          errorCode === 'auth/invalid-email'
        ) {
          throw new Error('Invalid email or password')
        }
        throw new Error('Unknown error')
      }
    },
    async logout() {
      const auth = useFirebaseAuth()
      if (!auth) {
        throw new Error('Firebase Auth is not initialized')
      }
      await signOut(auth)
      navigateTo('/login')
    },
  },
})
