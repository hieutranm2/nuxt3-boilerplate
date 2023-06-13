<template>
  <div>
    <h1>Home</h1>
    <p v-if="authStore.isLoggedIn">
      You're logged in as <b>{{ authStore.currentUser.email }}</b>
    </p>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const foo = useFoo()

console.log(foo.value)
</script>
