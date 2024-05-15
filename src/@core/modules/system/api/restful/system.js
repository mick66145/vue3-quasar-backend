import Resource from '@/@core/api/restful/resource'
import request from '@/utils/request'
import { baseModules } from '@/class'

class SystemResource extends Resource {
  constructor () {
    super('system')
  }

  async recordLoglist (query) {
    return await request({
      url: `/${this.uri}/record_log`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const systemLogObj = new baseModules.SystemRecordLog(element)
          return systemLogObj
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

  async viewCount (query) {
    return await request({
      url: `/${this.uri}/viewcount`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => res.data)
  }
}

export default SystemResource
