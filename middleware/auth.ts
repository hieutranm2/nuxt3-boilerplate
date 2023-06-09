const canAccess = (user: any, accessControlList: (string | string[])[]): boolean => {
  if (!user) {
    return false
  }

  const userPermissions = user.permissions || []
  const userRoles = user.roles || []

  const isMatched = (acl: string) => {
    const [aclType, aclValue] = acl.split(':')

    if (aclType === 'permission') {
      return userPermissions.includes(aclValue)
    }

    if (aclType === 'role') {
      return userRoles.includes(aclValue)
    }

    return false
  }

  return accessControlList.some((acl) => {
    if (Array.isArray(acl)) {
      return acl.every((subAcl) => isMatched(subAcl))
    }
    return isMatched(acl)
  })
}

export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()

  if (user) {
    const idTokenResult = await user.getIdTokenResult()
    user.roles = idTokenResult.claims.roles
    user.permissions = idTokenResult.claims.permissions
  }

  const isProtected = !!to.meta.accessControlList

  if (
    isProtected &&
    !canAccess(user, Array.isArray(to.meta.accessControlList) ? to.meta.accessControlList : [])
  ) {
    if (user) {
      // return 404 to prevent user enumeration
      return abortNavigation({ statusCode: 404, statusMessage: 'Not found' })
    }
    return navigateTo({
      path: (to.meta.permissionDeniedRedirect as string) ?? '/login',
      query: { redirect: to.fullPath },
    })
  }

  // If the route is not protected and user is logged in, redirect to home page
  if (!isProtected && user) {
    return navigateTo('/', { replace: true })
  }
})
