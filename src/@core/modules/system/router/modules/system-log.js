/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const systemLogRouter = {
  path: '/system-log',
  component: MainLayout,
  meta: {
    title: 'operate-log.title',
    slug: 'link',
    permissions: ['view operate_log'],
  },
  redirect: { name: 'SystemLogList' },
  children: [
    {
      path: '',
      component: () => import('@/@core/modules/system/views/system-log-list/SystemLogList.vue'),
      name: 'SystemLogList',
      meta: { title: 'operate-log.title', icon: 'fas fa-genderless', permissions: ['view operate_log'] },
    },
  ],
}

export default systemLogRouter
