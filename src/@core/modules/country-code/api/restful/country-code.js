import Resource from '@/@core/api/restful/resource'
import { CountryCode } from '@/@core/modules/country-code/models'

class CountryCodeResource extends Resource {
  constructor () {
    super('country_code')
    this.setModel(CountryCode)
  }
}

export default CountryCodeResource
