import Resource from '@/api/restful/resource'
import request from '@/utils/request'
import { baseModules } from '@/class'

class UserResource extends Resource {
  constructor () {
    super('user')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const userObj = new baseModules.User(element)
          return userObj
        })
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return { list: list }
        }
      },
      )
  }

  async get (id, query) {
    return await request({
      url: `/${this.uri}/${id}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const userObj = new baseModules.User({
          ...res.data,
        })
        return userObj
      })
  }

  async resetPassword (id) {
    return await request({
      url: `/${this.uri}/${id}/reset_password`,
      method: 'post',
    }).then(res => res.data)
  }
}

export default UserResource
