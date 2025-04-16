import type { SnackbarOptions } from '@/types';

import { DEFAULT_SNACKBAR_OPTIONS, SNACKBAR_TYPE } from '@/config';

export const useAppStore = defineStore('app', () => {
  // Loading -- This is a simple loading state that can be used to show a loading spinner
  const loading = ref(false);

  const showLoading = () => {
    loading.value = true;
  };

  const hideLoading = () => {
    loading.value = false;
  };

  // Snackbar -- This is a global snackbar that can be used to show messages to the user
  const snackbar = ref(false);
  const snackbarText = ref('');
  const snackbarColor = ref('');
  const snackbarOptions = ref<SnackbarOptions>({ ...DEFAULT_SNACKBAR_OPTIONS });

  const showSnackbar = (type: string, text: string, options?: Partial<SnackbarOptions>) => {
    snackbarText.value = text;
    snackbarColor.value = type;
    snackbar.value = true;
    snackbarOptions.value = { ...snackbarOptions.value, ...options };
  };

  const hideSnackbar = () => {
    snackbar.value = false;
  };

  const snackbarIcon = computed(() => {
    switch (snackbarColor.value) {
      case SNACKBAR_TYPE.info:
        return 'fa:fas fa-hands-clapping';
      case SNACKBAR_TYPE.error:
        return 'fa:fas fa-exclamation-circle';
    }
  });

  return {
    // Loading state
    loading,
    showLoading,
    hideLoading,
    // Snackbar state
    snackbar,
    snackbarText,
    snackbarColor,
    showSnackbar,
    hideSnackbar,
    snackbarIcon,
    snackbarOptions
  };
});
