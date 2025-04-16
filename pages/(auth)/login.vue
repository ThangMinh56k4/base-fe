<script setup lang="ts">
import { z } from 'zod'

import { LoginStrategy } from '@/types'

definePageMeta({
  layout: 'auth',
  auth: false
})

const { $auth } = useNuxtApp()
const router = useRouter()
const route = useRoute()

const emailQuery = computed(() => route.query.email as string | undefined)

const loginWithGoogleLoading = ref(false)

onMounted(() => {
  if (route.query.google_token) {
    handleGoogleLoginCallback(route.query.google_token as string)
  }
})

const { useFieldModel, errors, handleSubmit } = useForm({
  initialValues: {
    email: emailQuery.value || '',
    password: '',
    rememberMe: false
  },
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email('Invalid email').nonempty('Email is required'),
      password: z.string().nonempty('Password is required'),
      rememberMe: z.boolean()
    })
  )
})

const [email, password, rememberMe] = useFieldModel(['email', 'password', 'rememberMe'])

const onLogin = handleSubmit(async (values) => {
  const loggedIn = await $auth.loginWith(LoginStrategy.LOCAL, values)

  if (loggedIn) {
    router.push('/')
  }
})

const forgotPasswordLink = computed(() => {
  return `/forgot-password${email.value ? `?email=${email.value}` : ''}`
})

const loginWithFacebook = async () => {
  const loggedIn = await $auth.loginWith(LoginStrategy.FACEBOOK)

  if (loggedIn) {
    router.push('/')
  }
}

const loginWithGoogle = async () => {
  const loggedIn = await $auth.loginWith(LoginStrategy.GOOGLE)

  if (loggedIn) {
    router.push('/')
  }
}

const handleGoogleLoginCallback = async (token: string) => {
  try {
    loginWithGoogleLoading.value = true
    await $auth.setAuth(token)
    await router.push('/')
  }
  finally {
    loginWithGoogleLoading.value = false
  }
}
</script>

<template>
  <div class="login">
    <v-sheet
      width="500"
      class="card"
    >
      <h1 class="title">
        Login
      </h1>
      <v-form
        class="form"
        @submit.prevent="onLogin"
      >
        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Enter your email"
          :error-messages="errors.email"
          clearable
        />

        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          clearable
          :error-messages="errors.password"
          type="password"
        />

        <div class="action">
          <v-checkbox
            v-model="rememberMe"
            label="Remember me"
          />
          <nuxt-link
            :to="forgotPasswordLink"
            class="link"
          >
            Forgot password?
          </nuxt-link>
        </div>

        <v-btn
          color="primary"
          size="large"
          type="submit"
          rounded
          block
        >
          LOGIN
        </v-btn>

        <div class="wrapper">
          <span class="title">Or login with</span>
          <v-btn
            color="info"
            rounded
            size="large"
            block
            @click="loginWithFacebook"
          >
            Facebook
          </v-btn>
          <v-btn
            color="error"
            rounded
            size="large"
            block
            :loading="loginWithGoogleLoading"
            @click="loginWithGoogle"
          >
            Google
          </v-btn>
        </div>

        <p class="text">
          Don't have an account? Please
          <nuxt-link
            to="/register"
            class="link"
          >
            register </nuxt-link>.
        </p>
      </v-form>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  > .card {
    padding: 30px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: $box-shadow-lg;
  }
  > .card > .title {
    text-align: center;
  }
  > .card > .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  > .card > .form > .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > .card > .form > .wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
  > .card > .form > .wrapper > .title {
    text-align: center;
    color: theme-color('gray');
    font-size: 0.875rem;
  }
  .card > .form .link {
    color: theme-color('info');
    font-size: 1rem;
  }
  .card > .form .text {
    margin-top: 15px;
    text-align: center;
    color: theme-color('gray');
  }
}
</style>
