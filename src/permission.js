import router, { addRoutes } from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { useUser } from '@/stores/user'
import { usePermission } from '@/stores/permission'
import { usePlatformAttribute } from '@/stores/platformAttribute'
import { i18n } from '@/plugins/i18n'
import getPageTitle from './utils/get-page-title'
import useLogout from '@/hooks/useLogout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/register'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const store = useUser()
  const storePermission = usePermission()
  const storePlatformAttribute = usePlatformAttribute()
  const { resetStore } = useLogout()
  const hasToken = getToken()
  const hasPlatformAttribute = storePlatformAttribute.platformAttribute
  if (!hasPlatformAttribute) {
    await storePlatformAttribute.getPlatformAttribute()
  }
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const info = store.info
      if (info) {
        next()
      } else {
        try {
          await store.whoami()
          await store.permission()
          const accessRoutes = await storePermission.generateRoutes({ roles: [], permissions: store.permissionList })
          addRoutes(accessRoutes, {})
          next({ ...to, replace: true })
        } catch (error) {
          resetStore()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  // finish progress bar
  document.title = getPageTitle(to.meta.title ? i18n.global.t(to.meta.title || 'g.system-system-name', to.params.lang) : '')
  NProgress.done()
})
