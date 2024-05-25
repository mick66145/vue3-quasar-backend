import Resource from '@/@core/api/restful/resource'
import request from '@/@core/utils/request'
import { Area } from '@/@core/modules/area/models'

class AreaResource extends Resource {
  constructor () {
    super('area')
    this.setModel(Area)
  }
}

export default AreaResource
