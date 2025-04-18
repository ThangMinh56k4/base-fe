<script setup lang="ts"></script>

<template>
  <div id="_layout">
    <layout-content>
      <v-app>
        <v-main>
          <slot />
        </v-main>
      </v-app>
    </layout-content>
  </div>
</template>

<style lang="scss" scoped>
#_layout > .layout-content > .v-application :deep(.v-main) {
  > * {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    &:not(.error-section) {
      max-width: 100%;
    }
  }
}
</style>
