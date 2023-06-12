<template>
  <div>
    <template v-if="authStore.isAuthLoaded">
      <header>
        <div>Logo</div>
        <nav>
          <ul>
            <li v-for="menu in menus" :key="menu.key">
              <nuxt-link :to="menu.to">{{ menu.label }}</nuxt-link>
            </li>
            <li key="login">
              <button @click="handleClickLogInButton">
                {{ authStore.isLoggedIn ? 'Log out' : 'Log in' }}
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <slot />
      </main>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script setup>
const router = useRouter()
const authStore = useAuthStore()

const { data: customClaims } = await useAsyncData(() => authStore.getCustomClaims(), {
  watch: [authStore.getCustomClaims],
})

const menus = computed(() => {
  return [
    {
      key: 'home',
      label: 'Home',
      to: '/',
    },
    {
      key: 'profile',
      label: 'Profile',
      to: '/profile',
      acl: ['role:user'],
    },
  ].filter(
    (menu) =>
      // If menu has no acl, it is public
      !menu.acl ||
      checkACL(
        authStore.currentUser
          ? { ...authStore.currentUser, roles: customClaims.value.roles }
          : null,
        menu.acl
      )
  )
})

const handleClickLogInButton = async () => {
  if (authStore.isLoggedIn) {
    const isLoggedOut = await authStore.logout()
    if (isLoggedOut) {
      router.push('/login')
    }
  } else {
    router.push('/login')
  }
}
</script>
