/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const userRouter = {
  path: '/user',
  name: 'user',
  component: MainLayout,
  meta: {
    title: 'user.title',
    slug: 'link',
    permissions: ['view user'],
  },
  redirect: { name: 'UserList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/user/views/user-list/UserList.vue'),
      name: 'UserList',
      meta: { title: 'user.title', icon: 'fas fa-genderless', permissions: ['view user'] },
    },
    {
      path: 'create',
      component: () => import('@core/modules/user/views/user-list/UserCreate.vue'),
      name: 'UserCreate',
      meta: { title: '帳號詳情', permissions: ['create user'] },
      hidden: true,
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/user/views/user-list/UserEdit.vue'),
      name: 'UserEdit',
      meta: { title: '帳號詳情', permissions: ['update user'] },
      hidden: true,
    },
  ],
}

export default userRouter
