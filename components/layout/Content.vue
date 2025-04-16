<script setup lang="ts">
defineOptions({
  name: 'LayoutContent'
});

const appStore = useAppStore();
const { loading, snackbar, snackbarText, snackbarIcon, snackbarColor, snackbarOptions } = storeToRefs(appStore);
</script>

<template>
  <div class="layout-content">
    <slot />
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      v-bind="snackbarOptions"
    >
      <v-icon
        v-if="snackbarOptions.visibleIcon"
        :icon="snackbarIcon"
        size="24"
      />
      <p>{{ snackbarText }}</p>
    </v-snackbar>
    <app-loading :loading="loading" />
  </div>
</template>

<style lang="scss" scoped></style>
