<template>
  <div>
    <h1>Users Management</h1>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Users',
  layout: 'admin',
  middleware: ['auth'],
  accessControlList: ['role:superadmin', ['role:admin', 'permission:users.list']],
  permissionDeniedRedirect: '/admin/login',
})
</script>
