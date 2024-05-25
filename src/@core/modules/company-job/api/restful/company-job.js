import Resource from '@/@core/api/restful/resource'
import { CompanyJob } from '@/@core/modules/company-job/models'

class CompanyJobResource extends Resource {
  constructor () {
    super('company_job')
    this.setModel(CompanyJob)
  }
}

export default CompanyJobResource
