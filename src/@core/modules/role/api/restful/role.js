import Resource from '@/@core/api/restful/resource'
import { Role } from '@/@core/modules/role/models'

class RoleResource extends Resource {
  constructor () {
    super('role')
    this.setModel(Role)
  }
}

export default RoleResource
