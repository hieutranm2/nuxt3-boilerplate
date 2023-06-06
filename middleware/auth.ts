export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()
  if (to.path === '/login') {
    if (user) {
      return navigateTo('/', { replace: true })
    }
  } else {
    if (!user) {
      return navigateTo({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  }
})
