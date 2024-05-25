import Resource from '@/@core/api/restful/resource'
import { Company } from '@/@core/modules/company/models'

class CompanyResource extends Resource {
  constructor () {
    super('company')
    this.setModel(Company)
  }
}

export default CompanyResource
