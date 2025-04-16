<script setup lang="ts">
import { z } from 'zod';

import { SNACKBAR_TYPE, ROUTES } from '@/config';

definePageMeta({
  layout: 'auth'
});

const { $services } = useNuxtApp();
const router = useRouter();
const { showLoading, hideLoading, showSnackbar } = useAppStore();

const { useFieldModel, errors, handleSubmit } = useForm({
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().nonempty('Full name is required'),
      email: z.string().email('Invalid email').nonempty('Email is required'),
      password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string().nonempty('Confirm password is required').refine(
        (value: string): boolean => value === password.value,
        'Passwords do not match'
      )
    })
  )
});

const [name, email, password, confirmPassword] = useFieldModel(['name', 'email', 'password', 'confirmPassword']);
const acceptTerms = ref(false);

const register = handleSubmit(async (values) => {
  showLoading();
  const newUser = await $services.auth.register(values);
  hideLoading();

  if (newUser) {
    showSnackbar(SNACKBAR_TYPE.success, 'Register successfully');
    router.push({
      name: ROUTES.login.name,
      query: { email: values.email }
    });
  }
});
</script>

<template>
  <div class="register">
    <v-sheet
      width="500"
      class="card"
    >
      <h1 class="title">
        Register
      </h1>
      <v-form
        class="form"
        @submit.prevent="register"
      >
        <v-text-field
          v-model="name"
          label="Full Name"
          placeholder="Enter your full name"
          :error-messages="errors.name"
          clearable
        />

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
          type="password"
          :error-messages="errors.password"
          clearable
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your password again"
          type="password"
          :error-messages="errors.confirmPassword"
          clearable
        />

        <v-checkbox
          v-model="acceptTerms"
          label="I accept the terms and conditions"
        />

        <v-btn
          :disabled="!acceptTerms"
          color="primary"
          size="large"
          type="submit"
          rounded
          block
        >
          REGISTER
        </v-btn>

        <p class="text">
          If you have an account, please
          <nuxt-link
            to="/login"
            class="link"
          >log in</nuxt-link>.
        </p>
      </v-form>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
.register {
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
    font-size: 0.75rem;
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
