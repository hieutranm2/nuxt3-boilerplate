<template>
  <div>
    <h1>Admin Login</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="params.username" type="text" placeholder="Username" />
      <input v-model="params.password" type="password" placeholder="Password" />
      <label class="flexbox">
        <input v-model="params.rememberMe" type="checkbox" />
        <span>Remember me</span>
      </label>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Login',
  layout: 'admin',
  middleware: ['auth'],
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const errorMessage = ref('')
const params = ref({
  username: '',
  password: '',
  rememberMe: false,
})

const handleSubmit = async () => {
  const { username, password, rememberMe } = params.value
  if (username === '' || password === '') {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  try {
    await authStore.login(username, password, rememberMe)
    router.push((route.query.redirect as string) ?? '/profile')
  } catch (error: any) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped>
input {
  display: block;
  margin: 10px 0;
}

.flexbox {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.flexbox input {
  margin: 0;
}

p.form-error {
  color: red;
}
</style>
