<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="params.username" type="text" placeholder="Username" />
      <input v-model="params.password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Login',
  middleware: ['auth'],
})

const router = useRouter()
const authStore = useAuthStore()

const errorMessage = ref('')
const params = reactive({
  username: '',
  password: '',
})

const handleSubmit = async () => {
  const { username, password } = params
  if (username === '' || password === '') {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  try {
    await authStore.login(username, password)
    router.push('/profile')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
}

p.form-error {
  color: red;
}
</style>
