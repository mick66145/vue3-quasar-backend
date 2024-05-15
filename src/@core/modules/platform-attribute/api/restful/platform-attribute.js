import Resource from '@/@core/api/restful/resource'
import request from '@/@core/utils/request'
import { baseModules } from '@/class'

class PlatformAttributeResource extends Resource {
  constructor () {
    super('platform_attribute')
  }

  async get (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const platformAttributeObj = new baseModules.PlatformAttribute({
          ...res.data,
        })
        return platformAttributeObj
      })
  }
}

export default PlatformAttributeResource
