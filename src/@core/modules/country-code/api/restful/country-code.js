import Resource from '@/@core/api/restful/resource'
import request from '@/utils/request'
import { baseModules } from '@/class'

class CountryCodeResource extends Resource {
  constructor () {
    super('country_code')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const countryCodeObj = new baseModules.CountryCode(element)
          return countryCodeObj
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
        const countryCodeObj = new baseModules.CountryCode({
          ...res.data,
        })
        return countryCodeObj
      })
  }
}

export default CountryCodeResource
