/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const companyJobRouter = {
  path: '/company-job',
  name: 'CompanyJob',
  component: MainLayout,
  meta: {
    title: 'company-job.title',
    slug: 'link',
    permissions: ['view company_job'],
  },
  redirect: { name: 'CompanyJobList' },
  children: [
    {
      path: '',
      component: () => import('@/views/company-job/CompanyJobList.vue'),
      name: 'CompanyJobList',
      meta: { title: 'company-job.title', icon: 'fas fa-genderless', permissions: ['view company_job'] },
    },
  ],
}

export default companyJobRouter
