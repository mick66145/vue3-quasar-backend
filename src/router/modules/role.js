/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const roleRouter = {
  path: '/role',
  name: 'Role',
  component: MainLayout,
  meta: {
    title: 'role.title',
    slug: 'link',
    permissions: ['view role'],
  },
  redirect: { name: 'RoleList' },
  children: [
    {
      path: '',
      component: () => import('@/views/role/RoleList.vue'),
      name: 'RoleList',
      meta: { title: 'role.title', icon: 'fas fa-genderless', permissions: ['view role'] },
    },
    {
      path: 'create',
      component: () => import('@/views/role/RoleCreate.vue'),
      name: 'RoleCreate',
      meta: { title: '權限詳情', permissions: ['create role'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/role/RoleEdit.vue'),
      name: 'RoleEdit',
      meta: { title: '權限詳情', permissions: ['update role'] },
      hidden: true,
    },
  ],
}

export default roleRouter
