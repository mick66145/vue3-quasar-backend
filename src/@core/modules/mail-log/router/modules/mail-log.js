/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const mailLogRouter = {
  path: '/mail-log',
  component: MainLayout,
  meta: {
    title: 'mail-log.title',
    slug: 'link',
    permissions: ['view mail_log'],
  },
  redirect: { name: 'MailLogList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/mail-log/views/mail-log-list/MailLogList.vue'),
      name: 'MailLogList',
      meta: { title: 'mail-log.title', icon: 'fas fa-genderless', permissions: ['view mail_log'] },
    },
  ],
}

export default mailLogRouter
