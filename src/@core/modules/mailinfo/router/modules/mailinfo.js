/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const mailinfoRouter = {
  path: '/mailinfo',
  name: 'Mailinfo',
  component: MainLayout,
  meta: {
    title: 'mailinfo.title',
    slug: 'link',
  },
  redirect: { name: 'MailinfoList' },
  children: [
    {
      path: '',
      component: () => import('@/@core/modules/mailinfo/views/mailinfo-list/MailinfoList.vue'),
      name: 'MailinfoList',
      meta: { title: 'mailinfo.title', icon: 'fas fa-genderless', affix: true },
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/@core/modules/mailinfo/views/mailinfo-list/MailinfoEdit.vue'),
      name: 'MailinfoEdit',
      meta: { title: '信件詳情' },
      hidden: true,
    },
  ],
}

export default mailinfoRouter
