<template>
  <div>
    <button type="button" @click="router.back">Back</button>
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
const router = useRouter()
const authStore = useAuthStore()

const errorMessage = ref('')
const params = reactive({
  username: '',
  password: '',
})

const handleSubmit = () => {
  const { username, password } = params
  if (username === '' || password === '') {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  if (username !== 'm2vietnam' || password !== '123456') {
    errorMessage.value = 'Username or password is incorrect'
    return
  }
  authStore.login()
  router.push('/')
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
