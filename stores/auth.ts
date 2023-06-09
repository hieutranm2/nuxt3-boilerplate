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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
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

  async function logout() {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized')
    }
    try {
      await signOut(auth)
      return true
    } catch (error: any) {
      return false
    }
  }

  async function getCustomClaims(): Promise<Record<string, any> | null> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized')
    }
    const userValue = user.value
    if (!userValue) {
      return null
    }
    try {
      if (process.server) {
        return (userValue as any).customClaims
      } else {
        const idTokenResult = await userValue.getIdTokenResult()
        return idTokenResult?.claims
      }
    } catch (error: any) {
      return null
    }
  }

  return {
    currentUser,
    isAuthLoaded,
    isLoggedIn,
    login,
    logout,
    getCustomClaims,
  }
})
