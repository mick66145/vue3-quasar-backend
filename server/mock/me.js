const permissions = {
  'admin-token': {
    list: [
      {
        id: 1,
        name: 'view user_manage',
        action: 'view',
      },
      {
        id: 2,
        name: 'view company_job',
        action: 'view',
      },
      {
        id: 3,
        name: 'create company_job',
        action: 'create',
      },
      {
        id: 4,
        name: 'update company_job',
        action: 'update',
      },
      {
        id: 5,
        name: 'delete company_job',
        action: 'delete',
      },
      {
        id: 6,
        name: 'view role',
        action: 'view',
      },
      {
        id: 7,
        name: 'create role',
        action: 'create',
      },
      {
        id: 8,
        name: 'update role',
        action: 'update',
      },
      {
        id: 9,
        name: 'delete role',
        action: 'delete',
      },
      {
        id: 10,
        name: 'view user',
        action: 'view',
      },
      {
        id: 11,
        name: 'create user',
        action: 'create',
      },
      {
        id: 12,
        name: 'update user',
        action: 'update',
      },
      {
        id: 13,
        name: 'delete user',
        action: 'delete',
      },
      {
        id: 14,
        name: 'view operate_log',
        action: 'view',
      },
      {
        id: 15,
        name: 'view platform_manage',
        action: 'view',
      },
    ],
  },
}
const users = {
  'admin-token': {
    id: 1,
    name: '網站管理員',
    account: 'admin',
    email: 'admin@admin.com',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '管理員',
    },
  },
  'editor-token': {
    id: 2,
    name: '網站使用者',
    account: 'editor',
    email: 'editor@admin.com',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '網站使用者',
    },
  },
}

export default [
  {
    url: '/api/me',
    method: 'get',
    response: (req, res) => {
      const { authorization } = req.headers
      const token = authorization.split('Bearer ')[1]
      const info = users[token]
      if (!info) {
        return {
          code: 401,
          message: 'Unauthenticated',
        }
      }
      return {
        code: 200,
        data: info,
      }
    },
  },
  {
    url: '/api/me/permission',
    method: 'get',
    response: (req, res) => {
      const { authorization } = req.headers
      const token = authorization.split('Bearer ')[1]
      const info = users[token]
      if (!info) {
        return {
          code: 401,
          message: 'Unauthenticated',
        }
      }
      return {
        code: 200,
        data: permissions[token],
      }
    },
  },
]
