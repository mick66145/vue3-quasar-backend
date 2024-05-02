import Base from '@/class/modules/Base'
import BasePermission from './base/BasePermission';
import { convertDateTime } from '@/utils/data-convert'
class Role extends Base {

  //api欄位
  id = "";
  created_at = "";
  name = "";
  permissions = [];

  constructor(obj) {
    super();
    if (obj) {
      this.id = obj?.id
      this.created_at = convertDateTime(obj?.created_at)
      this.name = obj?.name
      this.permissions = [...obj?.permissions].map(element => {
        const permissionObj = new BasePermission(element)
        return permissionObj
      })
    }
  }
}
export default Role
