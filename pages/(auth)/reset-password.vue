<script setup lang="ts">
import { z } from 'zod';

import { ERROR_MESSAGES, ERROR_STATUS, SNACKBAR_TYPE, ROUTES } from '@/config';

definePageMeta({
  layout: 'auth',
  middleware: [
    (to) => {
      if (!to.query.token) {
        showError({
          statusCode: ERROR_STATUS.notFound,
          statusMessage: ERROR_MESSAGES.page.pageNotFound,
          message: ERROR_MESSAGES.page.invalidUrl
        });
      }
    }
  ]
});

const route = useRoute();
const router = useRouter();
const { $services } = useNuxtApp();
const { showLoading, hideLoading, showSnackbar } = useAppStore();

const token = computed(() => route.query.token as string | undefined);

const { useFieldModel, errors, handleSubmit } = useForm({
  initialValues: {
    password: '',
    confirmPassword: ''
  },
  validationSchema: toTypedSchema(
    z.object({
      password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
      confirmPassword: z
        .string()
        .nonempty('Confirm password is required')
        .refine((value: string): boolean => value === password.value, 'Passwords do not match')
    })
  )
});

const [password, confirmPassword] = useFieldModel(['password', 'confirmPassword']);

const onResetPassword = handleSubmit(async ({ password }) => {
  showLoading();
  const resetPasswordResponsive = await $services.auth.resetPassword(token.value!, password);
  hideLoading();

  if (resetPasswordResponsive) {
    showSnackbar(SNACKBAR_TYPE.success, 'Password reset successfully');
    router.push({
      name: ROUTES.login.name
    });
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
        Reset password
      </h1>
      <v-form
        class="form"
        @submit.prevent="onResetPassword"
      >
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Enter your new password"
          type="password"
          :error-messages="errors.password"
          clearable
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your new password again"
          type="password"
          :error-messages="errors.confirmPassword"
          clearable
        />

        <v-btn
          color="primary"
          size="large"
          type="submit"
          rounded
          block
        >
          Reset Password
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
