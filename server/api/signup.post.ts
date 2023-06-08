import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  try {
    const auth = getAuth()
    const { email, password, nickname } = body
    const createdUser = await auth.createUser({
      email,
      password,
      displayName: nickname,
    })
    await auth.setCustomUserClaims(createdUser.uid, {
      roles: ['user'],
      permissions: ['users.get', 'users.update'],
    })
    return { success: true }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
