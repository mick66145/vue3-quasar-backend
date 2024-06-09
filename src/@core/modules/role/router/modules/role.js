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
      component: () => import('@core/modules/role/views/role-list/RoleList.vue'),
      name: 'RoleList',
      meta: { title: 'role.title', icon: 'fas fa-genderless', permissions: ['view role'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/role/views/role-list/RoleCreate.vue'),
      name: 'RoleCreate',
      meta: { title: '權限詳情', permissions: ['create role'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@core/modules/role/views/role-list/RoleEdit.vue'),
      name: 'RoleEdit',
      meta: { title: '權限詳情', permissions: ['update role'] },
      hidden: true,
    },
  ],
}

export default roleRouter
