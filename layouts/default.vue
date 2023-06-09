<template>
  <div>
    <template v-if="authStore.isAuthLoaded">
      <header>
        <div>Logo</div>
        <nav>
          <ul>
            <li key="home">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li v-if="customClaims?.roles?.includes('user')" key="profile">
              <nuxt-link to="/profile">Profile</nuxt-link>
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

const { data: customClaims } = await useAsyncData(
  () => {
    return authStore.getCustomClaims()
  },
  {
    watch: [authStore.getCustomClaims],
    pick: ['roles'],
  }
)

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
