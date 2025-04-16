<script setup lang="ts">
import { z } from 'zod';

import { SNACKBAR_TYPE } from '@/config';

definePageMeta({
  layout: 'auth',
  auth: 'guest'
});

const { $services } = useNuxtApp();
const route = useRoute();

const emailQuery = computed(() => route.query.email as string | undefined);

const { showLoading, hideLoading, showSnackbar } = useAppStore();

const { useFieldModel, errors, handleSubmit } = useForm({
  initialValues: {
    email: emailQuery.value || ''
  },
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email('Invalid email').nonempty('Email is required')
    })
  )
});

const email = useFieldModel('email');

const onForgotPassword = handleSubmit(async ({ email }) => {
  showLoading();
  const redirectUrl = `${window.location.origin}/reset-password`;
  const forgotPasswordResponsive = await $services.auth.forgotPassword(email, redirectUrl);
  hideLoading();

  if (forgotPasswordResponsive) {
    showSnackbar(SNACKBAR_TYPE.success, 'Reset link sent successfully');
  }
});
</script>

<template>
  <div class="forgot-password">
    <v-sheet
      width="500"
      class="card"
    >
      <h1 class="title">
        Forgot password
      </h1>
      <v-form
        class="form"
        @submit.prevent="onForgotPassword"
      >
        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Enter your email"
          :error-messages="errors.email"
          clearable
        />

        <v-btn
          color="primary"
          size="large"
          type="submit"
          rounded
          block
        >
          Send Reset Link
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
.forgot-password {
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
}
</style>
