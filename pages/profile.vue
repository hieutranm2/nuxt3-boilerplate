<template>
  <div>
    <h1>Profile</h1>
    <p>
      I am <b>{{ authStore.currentUser.displayName }}</b>
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Profile',
  middleware: ['auth'],
  accessControlList: [['role:user', 'permission:users.get']],
  permissionDeniedRedirect: '/login',
})
const authStore = useAuthStore()
</script>
