import type { User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const { $services } = useNuxtApp();

  const user = ref<User | null>(null);

  const loggedIn = computed(() => user.value !== null);

  const setUser = (newUser: User | null) => {
    user.value = newUser;
  };

  const fetchUser = async () => {
    user.value = await $services.auth.me();
  };

  return {
    user,
    loggedIn,
    setUser,
    fetchUser
  };
});
