import Resource from '@/@core/api/restful/resource'
import request from '@/@core/utils/request'
import { City } from '@/@core/modules/city/models'

class CityResource extends Resource {
  constructor () {
    super('city')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const cityObj = new City(element)
          return cityObj
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
        const cityObj = new City({
          ...res.data,
        })
        return cityObj
      })
  }
}

export default CityResource
