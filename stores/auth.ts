import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const user = useCurrentUser()

  // Getters
  const currentUser = computed(() => user.value)
  const isAuthLoaded = computed(() => user.value !== undefined)
  const isLoggedIn = computed(() => !!user.value)

  // Actions
  async function login(email: string, password: string, isRemember: boolean) {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized')
    }
    try {
      await setPersistence(auth, isRemember ? browserLocalPersistence : browserSessionPersistence)
      await signInWithEmailAndPassword(auth, email, password)
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
  }

  async function logout(redirectTo: string = '/login') {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized')
    }
    await signOut(auth)
    navigateTo(redirectTo)
  }

  return {
    currentUser,
    isAuthLoaded,
    isLoggedIn,
    login,
    logout,
  }
})
