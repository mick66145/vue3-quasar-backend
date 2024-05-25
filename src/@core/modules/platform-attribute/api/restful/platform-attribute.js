import Resource from '@/@core/api/restful/resource'
import { PlatformAttribute } from '@/@core/modules/platform-attribute/models'

class PlatformAttributeResource extends Resource {
  constructor () {
    super('platform_attribute')
    this.setModel(PlatformAttribute)
  }
}

export default PlatformAttributeResource
