import Resource from '@/api/restful/resource'
import request from '@/utils/request'
import { baseModules } from '@/class'

class RoleResource extends Resource {
  constructor () {
    super('role')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const roleObj = new baseModules.Role(element)
          return roleObj
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
        const roleObj = new baseModules.Role({
          ...res.data,
        })
        return roleObj
      })
  }
}

export default RoleResource
