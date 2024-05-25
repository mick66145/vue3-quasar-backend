import Resource from '@/@core/api/restful/resource'
import { City } from '@/@core/modules/city/models'

class CityResource extends Resource {
  constructor () {
    super('city')
    this.setModel(City)
  }
}

export default CityResource
