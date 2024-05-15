import Resource from '@/@core/api/restful/resource'
import request from '@/@core/utils/request'
import { Area } from '@/@core/modules/area/models'

class AreaResource extends Resource {
  constructor () {
    super('area')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const areaObj = new Area(element)
          return areaObj
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
        const areaObj = new Area({
          ...res.data,
        })
        return areaObj
      })
  }
}

export default AreaResource
