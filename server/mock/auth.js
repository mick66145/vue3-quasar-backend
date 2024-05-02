const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: config => {
      const { account } = config.body
      const token = tokens[account]
      if (!token) {
        return {
          code: 404,
          message: 'Account and password are incorrect.',
        }
      }
      return {
        code: 200,
        data: token,
      }
    },
  },
]
