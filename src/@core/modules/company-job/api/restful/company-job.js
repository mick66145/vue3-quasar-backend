import Resource from '@/@core/api/restful/resource'
import request from '@/@core/utils/request'
import { baseModules } from '@/class'

class CompanyJobResource extends Resource {
  constructor () {
    super('company_job')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const companyJobObj = new baseModules.CompanyJob(element)
          return companyJobObj
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
        const companyJobObj = new baseModules.CompanyJob({
          ...res.data,
        })
        return companyJobObj
      })
  }
}

export default CompanyJobResource
