import Resource from '@/@core/api/restful/resource'
import request from '@/utils/request'

class AuthResource extends Resource {
  constructor () {
    super('auth')
  }

  async login (params) {
    return await request({
      url: `/${this.uri}/login`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  async register (params) {
    return await request({
      url: `/${this.uri}/register`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  async forgetPassword (params) {
    return await request({
      url: `/${this.uri}/forget_password`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  async getVerifyCode (params) {
    return await request({
      url: `/${this.uri}/get-signup-verify-code`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  async logout () {
    return await request({
      url: `/${this.uri}/logout`,
      method: 'post',
    })
  }

  async refreshToken (params) {
    return await request({
      url: `/${this.uri}/refresh_token`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  async me () {
    return await request({
      url: `/${this.uri}/me`,
      method: 'get',
    }).then(res => res.data)
  }

  async profile (params) {
    return request({
      url: `/${this.uri}/me`,
      method: 'patch',
      data: params,
    })
  }

  async permission () {
    return await request({
      url: `/${this.uri}/permission`,
      method: 'get',
    }).then(res => res.data)
      .then(res => {
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return {
            list: list,
          }
        }
      })
  }

  async changePassword (params) {
    return request({
      url: `/${this.uri}/change_password`,
      method: 'post',
      data: params,
    })
  }
}

export default AuthResource
