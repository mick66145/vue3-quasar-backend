/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const companyRouter = {
  path: '/company',
  name: 'Company',
  component: MainLayout,
  meta: {
    title: 'company.title',
    slug: 'link',
    permissions: ['view company'],
  },
  redirect: { name: 'CompanyList' },
  children: [
    {
      path: '',
      component: () => import('@/@core/modules/company/views/company-list/CompanyList.vue'),
      name: 'CompanyList',
      meta: { title: 'company.title', icon: 'fas fa-genderless', affix: true, permissions: ['view company'] },
    },
    {
      path: 'create',
      component: () => import('@/@core/modules/company/views/company-list/CompanyCreate.vue'),
      name: 'CompanyCreate',
      meta: { title: '公司詳情', permissions: ['create company'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/@core/modules/company/views/company-list/CompanyEdit.vue'),
      name: 'CompanyEdit',
      meta: { title: '公司詳情', permissions: ['update company'] },
      hidden: true,
    },
  ],
}

export default companyRouter
