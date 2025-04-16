<script setup lang="ts"></script>

<template>
  <div id="_layout">
    <layout-content>
      <v-app>
        <v-app-bar
          title="Layout training header"
          color="primary"
        />
        <v-navigation-drawer color="gray">
          <v-list>
            <v-list-item title="Navigation drawer" />
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <slot />
        </v-main>
        <v-footer
          app
          color="primary"
          dark
        >
          <span>&copy; 2021</span>
        </v-footer>
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
    &:not(.error-section) {
      max-width: 1200px;
    }
  }
}
</style>
