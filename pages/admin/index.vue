<template>
  <div>
    <h1>Welcome to Admin Dashboard</h1>
    <p>
      I am <b>{{ authStore.currentUser.displayName }}</b>
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Admin',
  layout: 'admin',
  middleware: ['auth'],
  accessControlList: ['role:superadmin', 'role:admin'],
  permissionDeniedRedirect: '/admin/login',
})

const authStore = useAuthStore()
</script>
