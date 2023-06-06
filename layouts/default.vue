<template>
  <div>
    <header>
      <div>Logo</div>
      <nav>
        <ul>
          <li key="home">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li v-if="authStore.isLoggedIn" key="profile">
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
  </div>
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
