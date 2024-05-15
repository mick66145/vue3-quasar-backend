import Resource from '@/@core/api/restful/resource'
import request from '@/@core/utils/request'
import { PlatformAttribute } from '@/@core/modules/platform-attribute/models'

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
        const platformAttributeObj = new PlatformAttribute({
          ...res.data,
        })
        return platformAttributeObj
      })
  }
}

export default PlatformAttributeResource
