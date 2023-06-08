<template>
  <div>
    <template v-if="authStore.isAuthLoaded">
      <header>
        <div>Admin Logo</div>
        <nav v-if="authStore.isLoggedIn">
          <ul>
            <li key="home">
              <nuxt-link to="/admin">Dashboard</nuxt-link>
            </li>
            <li key="profile">
              <nuxt-link to="/admin/users">Users Management</nuxt-link>
            </li>
            <li key="logout">
              <button @click="handleClickLogOutButton">Log out</button>
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
const authStore = useAuthStore()

const handleClickLogOutButton = async () => {
  if (authStore.isLoggedIn) {
    const isLoggedOut = await authStore.logout()
    if (isLoggedOut) {
      navigateTo('/admin/login')
    }
  }
}
</script>
