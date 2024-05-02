import Resource from '@/api/restful/resource'
import request from '@/utils/request'
import { baseModules } from '@/class'

class CompanyResource extends Resource {
  constructor () {
    super('company')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const companyObj = new baseModules.Company(element)
          return companyObj
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
        const companyObj = new baseModules.Company({
          ...res.data,
        })
        return companyObj
      })
  }
}

export default CompanyResource
