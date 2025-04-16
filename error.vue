<script setup lang="ts">
import type { AppError } from '@/types';

import { ERROR_STATUS } from '@/config';

const { error } = defineProps<{
  error: AppError;
}>();

const icon = computed(() => {
  if (error?.data?.icon) {
    return error.data.icon;
  }

  if (error.statusCode === ERROR_STATUS.notFound) {
    return 'far fa-face-sad-tear';
  }

  return 'far fa-exclamation-circle';
});
</script>

<template>
  <NuxtLayout>
    <div class="error-section">
      <div class="icon">
        <v-icon
          :icon="icon"
          size="100"
        />
      </div>
      <div class="description">
        <h2 class="title">
          {{ error.statusMessage }}
        </h2>
        <p class="message">
          {{ error.message }}
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3.5rem;
  position: fixed;
  width: 100vw;
  left: 0;
  background-color: white;

  > .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: theme-color(primary);
  }
  > .description > .title {
    text-align: center;
    margin-bottom: 1rem;
  }
  > .description > .message {
    text-align: center;
  }
}
</style>
