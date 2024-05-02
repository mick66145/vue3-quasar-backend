import Resource from '@/api/restful/resource'
import request from '@/utils/request'
import { baseModules } from '@/class'

class MailLogResource extends Resource {
  constructor () {
    super('mail_log')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const mailLogObj = new baseModules.MailLog(element)
          return mailLogObj
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
        const mailLogObj = new baseModules.MailLog({
          ...res.data,
        })
        return mailLogObj
      })
  }
}

export default MailLogResource
