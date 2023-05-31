<template>
  <header>
    <div>Logo</div>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
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

<script setup>
const router = useRouter()
const authStore = useAuthStore()

const handleClickLogInButton = () => {
  if (authStore.isLoggedIn) {
    authStore.logout()
  } else {
    router.push('/login')
  }
}
</script>
