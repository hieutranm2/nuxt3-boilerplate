import { User } from 'firebase/auth'

export const checkACL = (
  user: User & { roles?: string[]; permissions?: string[] },
  accessControlList: (string | string[])[]
): boolean => {
  if (!user) {
    return false
  }

  const userRoles: string[] = user.roles ?? []
  const userPermissions: string[] = user.permissions ?? []

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
