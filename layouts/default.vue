<template>
  <div>
    <template v-if="authStore.isAuthLoaded">
      <header class="flex items-center gap-8 bg-slate-500 px-5 py-2">
        <div class="bg-sky-200 px-2 py-1 font-serif font-bold text-pink-400">Logo.</div>
        <nav class="flex flex-1 items-center justify-end">
          <ul class="flex items-center gap-5">
            <li key="home" class="text-white underline">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li
              v-if="customClaims?.roles?.includes('user')"
              key="profile"
              class="text-white underline"
            >
              <nuxt-link to="/profile">Profile</nuxt-link>
            </li>
            <li key="login">
              <button
                class="rounded-lg border-2 border-white px-2 text-white"
                @click="handleClickLogInButton"
              >
                {{ authStore.isLoggedIn ? 'Log out' : 'Log in' }}
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main class="p-6">
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

<style scoped>
.hello {
  @apply border-2 rounded-lg border-white px-2 text-white;
}
</style>
