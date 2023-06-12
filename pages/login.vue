<template>
  <div class="mx-auto w-96">
    <h1 class="mb-6 text-center text-2xl font-bold">Login</h1>
    <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
      <input
        v-model="params.username"
        class="rounded-lg border px-2 py-1"
        type="text"
        placeholder="Username"
      />
      <input
        v-model="params.password"
        class="rounded-lg border px-2 py-1"
        type="password"
        placeholder="Password"
      />
      <label class="flex w-fit items-center gap-2">
        <input v-model="params.rememberMe" type="checkbox" />
        <span>Remember me</span>
      </label>
      <button class="rounded-lg bg-sky-600 px-2 py-1 text-white" type="submit">Login</button>
      <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
      <hr />
      <p>
        Don't have an account?
        <nuxt-link class="text-sky-600" to="/signup">Register now</nuxt-link>
      </p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Login',
  middleware: ['auth'],
})

const ACCEPTED_ROLE = 'user'

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
    const claims = await authStore.getCustomClaims()
    if (!claims.roles?.includes(ACCEPTED_ROLE)) {
      const isLoggedOut = await authStore.logout()
      if (isLoggedOut) {
        errorMessage.value = 'Invalid email or password'
      }
      return
    }
    router.push(route.query.redirect ?? '/profile')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
