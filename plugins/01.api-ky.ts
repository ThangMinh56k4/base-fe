import ky from 'ky-universal';
import type { KyInstance } from 'ky';

import { SNACKBAR_TYPE, LOCAL_STORAGE_KEY } from '@/config';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const { showSnackbar } = useAppStore();
  const token = useCookie(LOCAL_STORAGE_KEY.TOKEN);

  const handleError = async (error: any) => {
    if (error.response?.status === 401) {
      showSnackbar(SNACKBAR_TYPE.error, 'Unauthorized');
      token.value = null;

      return;
    }
    const errorData = await error.response.json();
    const message = errorData.message || 'Something went wrong';
    showSnackbar(SNACKBAR_TYPE.error, message);
  };

  const api: KyInstance = ky.create({
    prefixUrl: runtimeConfig.public.API_BASE_URL,
    timeout: 30000,
    credentials: 'include',
    hooks: {
      beforeError: [
        async (error) => {
          await handleError(error);
          return error;
        }
      ]
    }
  });

  return {
    provide: {
      ky: api
    }
  };
});
