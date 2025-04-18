import { ROUTES, META_AUTH } from '@/config'

export default defineNuxtRouteMiddleware((to) => {
  const { $auth } = useNuxtApp()

  const isLoggedIn = $auth.loggedIn.value
  const isGuestRoute = to.meta.auth === META_AUTH.guest
  const requiresAuth = to.meta.auth
  const isLoginRoute = to.name === ROUTES.login.name

  if (requiresAuth && !isLoggedIn && !isLoginRoute) {
    return navigateTo(ROUTES.login.path)
  }

  if (isLoggedIn && isLoginRoute && requiresAuth) {
    return navigateTo(ROUTES.home.path)
  }

  if (isGuestRoute || !requiresAuth) {
    return
  }
})
