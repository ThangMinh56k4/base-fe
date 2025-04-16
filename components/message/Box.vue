<script setup lang="ts">
import type { Message } from '@/types'

const { user } = storeToRefs(useAuthStore())

const { message } = defineProps<{
  message: Message
}>()

const isCurrentUser = computed(() => {
  return !!user.value && message.sender.id === user.value.id
})

const color = computed(() => {
  return message.sender.color
})
</script>

<template>
  <div
    :class="[
      'wrapper',
      {
        '-is-current-user': isCurrentUser
      }
    ]"
  >
    <div class="date">
      {{ formatDate(message.createdAt) }}
    </div>
    <div class="message">
      <message-user
        :message="message"
        class="user"
      />
      <div
        class="content"
        :style="{ backgroundColor: color }"
      >
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  > .date {
    font-size: 0.75rem;
    color: theme-color('gray');
    text-align: center;
  }
  &.-is-current-user > .message {
    justify-content: flex-end;
  }
  &.-is-current-user > .message > .user {
    order: 1;
  }
  &.-is-current-user > .message > .content {
    order: 0;
  }
  > .message {
    display: flex;
    align-items: flex-end;
    gap: 5px;
  }
  > .message > .content {
    padding: 10px;
    border-radius: 10px;
    font-size: 0.75rem;
    color: theme-color('on-primary');
    flex-shrink: 1;
    max-width: 70%;
  }
}
</style>
