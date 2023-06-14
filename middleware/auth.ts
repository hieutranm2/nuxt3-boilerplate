export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()

  const isProtected = !!to.meta.accessControlList

  if (isProtected) {
    if (user) {
      if (process.server) {
        user.roles = user.customClaims?.roles
        user.permissions = user.customClaims?.permissions
      } else {
        const idTokenResult = await user.getIdTokenResult()
        user.roles = idTokenResult.claims.roles
        user.permissions = idTokenResult.claims.permissions
      }
    }
    const canAccess = checkACL(
      user,
      Array.isArray(to.meta.accessControlList) ? to.meta.accessControlList : []
    )
    if (!canAccess) {
      if (user) {
        // return 404 to prevent user enumeration
        return abortNavigation({ statusCode: 404, statusMessage: 'Not found' })
      }
      return navigateTo({
        path: (to.meta.permissionDeniedRedirect as string) ?? '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    // If the route is not protected and user is logged in, redirect to home page
    if (user) {
      return navigateTo('/', { replace: true })
    }
  }
})
