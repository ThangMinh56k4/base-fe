<script setup lang="ts">
const { $auth } = useNuxtApp()

const { user } = storeToRefs(useAuthStore())

const avatar = computed(() => {
  return user.value?.picture
})

const color = computed(() => {
  return user.value?.color
})

const logout = () => {
  $auth.logout()
}
</script>

<template>
  <v-app-bar class="layout-header">
    <template #title>
      <slot name="appTile">
        <nuxt-link
          to="/"
          class="title"
        >
          Training App
        </nuxt-link>
      </slot>
    </template>
    <v-spacer />
    <v-menu v-if="user">
      <template #activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          <img
            v-show="avatar"
            :src="avatar"
            class="avatar"
            alt="User Avatar"
          >
          <div
            v-if="!avatar"
            :style="{ '--color': color }"
            class="avatar"
          >
            <v-icon icon="fas fa-user" />
          </div>

          <span
            :style="{ '--color': color }"
            class="name"
          >{{ user.name }}</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title
            class="action"
            @click="logout"
          >
            <v-icon icon="fas fa-sign-out-alt" />
            <span class="ml-2">Logout</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.layout-header :deep(.v-toolbar__content) {
  > .v-toolbar-title > .v-toolbar-title__placeholder > .title {
    color: theme-color(primary);
    text-decoration: none;
    font-size: 25px;
    font-weight: bold;
    line-height: 1.3;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color);
    color: white;
  }

  .name {
    font-size: 0.75rem;
    font-weight: bold;
    color: var(--color);
    margin-left: 10px;
  }
}
</style>

<style lang="scss">
.v-list-item-title.action {
  cursor: pointer;
}
</style>
