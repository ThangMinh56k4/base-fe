<script setup lang="ts">
defineOptions({
  name: 'AppLoadingSpinner'
});

const { size } = defineProps<{
  size?: string
}>();
</script>

<template>
  <v-icon
    icon="fa:fas fa-spinner"
    :size="size"
    class="app-loading-spinner"
  />
</template>

<style lang="scss" scoped>
.app-loading-spinner {
  color: theme-color(on-primary);
  animation: loading-rotate 1.5s linear infinite;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
