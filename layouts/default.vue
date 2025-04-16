<script setup lang="ts"></script>

<template>
  <div id="_layout">
    <layout-content>
      <v-app>
        <layout-header />
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
    padding: 20px;
    &:not(.error-section){
      max-width: 1200px;
    }
  }
}
</style>
