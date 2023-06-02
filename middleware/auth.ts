export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  if (to.path === '/login') {
    if (authStore.isLoggedIn) {
      return navigateTo('/')
    }
  } else {
    if (!authStore.isLoggedIn) {
      return navigateTo('/login')
    }
  }
})
