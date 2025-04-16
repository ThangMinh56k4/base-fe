import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app';

export default defineNuxtPlugin(() => {
  const { $auth } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const socket: Socket = io(runtimeConfig.public.API_BASE_URL, {
    auth: {
      token: $auth.token.value
    },
    transports: ['websocket']
  });

  return {
    provide: {
      socket
    }
  };
});
