<template>
  <div>
    <h1>Home</h1>
    <p v-if="authStore.isLoggedIn">
      You're logged in as <b>{{ authStore.currentUser!.email }}</b>
    </p>
    <div class="flex flex-col gap-3">
      <p>Users list: {{ usersList }}</p>
      <p>User info: {{ userInfo }}</p>
      <p>User cart: {{ userCart }}</p>
      <div class="flex gap-3">
        <UiButton @click="createNewUser">Create user</UiButton>
        <UiButton @click="updateUser">Update user</UiButton>
        <UiButton @click="deleteUser">Delete user</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const userRepository = useUserRepository()

const { data: usersList } = await userRepository.getAll()
const { data: userInfo } = await userRepository.get('id')
const { data: userCart } = await userRepository.getCart('id')

const createNewUser = async () => {
  const newUser = await userRepository.create({
    email: 'user@mail.com',
    name: 'user',
  })
  console.log('POST response:', newUser)
  if (newUser.data.id) {
    alert(
      'Create user successfully\n' +
        Object.entries(newUser.data)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
    )
  }
}

const updateUser = async () => {
  const newUser = await userRepository.update('1', {
    email: 'user@mail.com',
    name: 'user updated',
  })
  console.log('PUT response:', newUser)
  if (newUser.data.id) {
    alert(
      'Update user successfully\n' +
        Object.entries(newUser.data)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
    )
  }
}

const deleteUser = async () => {
  const deletedUser = await userRepository.remove('1')
  console.log('DELETE response:', deletedUser)
  if (deletedUser.data.id) {
    alert('Delete user successfully\nUser ID: ' + deletedUser.data.id)
  }
}
</script>
