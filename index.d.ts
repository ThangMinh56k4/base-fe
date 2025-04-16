import type { KyInstance } from 'ky';
import type { Socket } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

import type { ApiServices } from '@/services';
import type { NuxtAppAuth } from '@/types';

declare module '#app' {
  interface NuxtApp {
    $ky: KyInstance;
    $services: ApiServices;
    $auth: NuxtAppAuth;
    $socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  }

  interface PageMeta {
    auth?: 'guest' | boolean;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $ky: KyInstance;
    $services: ApiServices;
    $auth: NuxtAppAuth;
    $socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  }
}

declare global {
  interface Window {
    FB: any;
  }
}
export {};
