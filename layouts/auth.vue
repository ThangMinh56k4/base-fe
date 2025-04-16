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
#_layout > .layout-content .v-application :deep(.v-main) {
  background-image: url('@/assets/img/bg-auth.jpg');
  background-size: cover;
  background-position: center;
  > * {
    width: 100%;
    height: 100%;
  }
}
</style>
