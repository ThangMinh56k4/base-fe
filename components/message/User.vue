<script setup lang="ts">
import type { Message } from '@/types'

const { message } = defineProps<{
  message: Message
}>()

const picture = computed(() => {
  return message.sender.picture
})

const userName = computed(() => {
  return message.sender.name.split('')[0] || ''
})

const color = computed(() => {
  return message.sender.color
})
</script>

<template>
  <v-tooltip :text="message.sender.name">
    <template #activator="{ props }">
      <div
        class="user-info"
        :style="{ '--color': color }"
        v-bind="props"
      >
        <img
          v-show="picture"
          :src="picture"
          class="avatar"
          alt="User Avatar"
        >
        <span v-if="!picture">{{ userName }}</span>
      </div>
    </template>
  </v-tooltip>
</template>

<style lang="scss" scoped>
.user-info {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: var(--color);
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  > .avatar {
    width: 100%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    background-color: var(--color);
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
