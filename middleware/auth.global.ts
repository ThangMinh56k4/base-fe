import { ROUTES, META_AUTH } from '@/config';

export default defineNuxtRouteMiddleware((to) => {
  const { $auth } = useNuxtApp();

  if (to.meta.auth === META_AUTH.guest) {
    return;
  }

  if (!to.meta.auth) {
    if ($auth.loggedIn.value) {
      return navigateTo(ROUTES.home.path);
    }

    return;
  }

  if (to.meta.auth && !$auth.loggedIn.value && to.name !== ROUTES.login.name) {
    return navigateTo(ROUTES.login.path);
  }
});
