import { createRouter, createWebHistory } from 'vue-router'
import {setupGuards} from './guard'

/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'
import EntryLayout from '@/layouts/EntryLayout.vue'

/* Router Modules */
import companyRouter from '@/@core/modules/company/router'
import companyJobRouter from '@/@core/modules/company-job/router'
import userRouter from '@/@core/modules/user/router'
import roleRouter from '@/@core/modules/role/router'
import mailinfoRouter from '@/@core/modules/mailinfo/router'
import systemLogRouter from '@/@core/modules/system/router'
import mailLogRouter from '@/@core/modules/mail-log/router'
import browserHistoryRouter from '@/@core/modules/browser-history/router'
import basicSettingRouter from './modules/basic-setting'

export const constantRoutes = [
  {
    path: '/redirect',
    component: MainLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/login',
    component: EntryLayout,
    redirect: { name: 'Login' },
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/entry/login/Login.vue'),
        name: 'Login',
      },
    ],
  },
  {
    path: '/register',
    component: EntryLayout,
    redirect: { name: 'Register' },
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/entry/register/Register.vue'),
        name: 'Register',
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    meta: {
      slug: 'link',
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/profile',
    component: MainLayout,
    redirect: '/profile',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/profile/Profile.vue'),
        name: 'Profile',
        meta: { title: '個人資料' },
      },
    ],
  },
]

export const asyncRoutes = [
  {
    path: '/',
    group: ['/mailinfo'],
    groupName: 'first',
    meta: {
      title: 'meun.system-information-manage',
      icon: 'fa-solid fa-server',
      slug: 'dropdown',
    },
    children: [
      mailinfoRouter,
    ],
  },
  {
    path: '/',
    group: ['/company-job', '/company', '/role', '/user'],
    groupName: 'first',
    meta: {
      title: 'meun.user-manage',
      icon: 'fas fa-solid fa-users',
      slug: 'dropdown',
    },
    children: [
      companyRouter,
      companyJobRouter,
      roleRouter,
      userRouter,
    ],
  },
  basicSettingRouter,
  {
    path: '/',
    group: ['/system-log', '/mail-log', '/browser-history'],
    groupName: 'first',
    meta: {
      title: 'meun.system-log',
      icon: 'fa-solid fa-circle-info',
      slug: 'dropdown',
    },
    children: [
      systemLogRouter,
      mailLogRouter,
      browserHistoryRouter,
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
})

export function addRoutes (routes = [], { parent = '' }) {
  routes.forEach(route => {
    if (parent) {
      router.addRoute(parent, route)
    } else {
      router.addRoute(route)
    }
  })
}
setupGuards(router)
export default router
