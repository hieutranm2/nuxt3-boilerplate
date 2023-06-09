export default defineNuxtPlugin(() => {
  const app = useFirebaseApp()
  const auth = useFirebaseAuth()
  const firestore = useFirestore()

  return {
    provide: {
      firebase: {
        app,
        auth,
        firestore,
      },
    },
  }
})
