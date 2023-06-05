<template>
  <div>
    <h1>Profile</h1>
    <p>
      I am <b>{{ authStore.user?.email }}</b>
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Profile',
  middleware: ['auth'],
})
const authStore = useAuthStore()
</script>
