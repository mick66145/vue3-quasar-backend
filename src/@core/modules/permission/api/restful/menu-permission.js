import Resource from '@/@core/api/restful/resource'
import { MenuPermission } from '@/@core/modules/permission/models'

class MenuPermissionResource extends Resource {
  constructor () {
    super('menu_permission')
    this.setModel(MenuPermission)
  }
}

export default MenuPermissionResource
