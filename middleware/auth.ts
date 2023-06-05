export default defineNuxtRouteMiddleware((to) => {
  const user = useCurrentUser()
  if (to.path === '/login') {
    if (user) {
      return navigateTo('/', { replace: true })
    }
  } else {
    if (!user) {
      return navigateTo('/login', { replace: true })
    }
  }
})
