<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSubmitForm">
      <div>
        <label for="nickname">Nickname</label>
        <input id="nickname" v-model="params.nickname" type="text" />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="params.email" type="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="params.password" type="password" />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" v-model="params.confirmPassword" type="password" />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Sign Up',
  middleware: ['auth'],
})

const params = ref({
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleSubmitForm = async () => {
  try {
    const { confirmPassword, ...userInfo } = params.value
    const result = await $fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(userInfo),
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: block;
}
</style>
