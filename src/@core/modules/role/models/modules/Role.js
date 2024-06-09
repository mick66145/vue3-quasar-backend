import Base from '@core/models/modules/Base'
import { BasePermission } from '@core/modules/permission/models'
import { convertDateTime } from '@/utils/data-convert'

const Role = {
  ...Base,
  //api欄位
  id : "",
  created_at : "",
  name : "",
  permissions : [],
}

const RoleFactory = (item = null) => {
  const factory = (item) => {
    return {
      //api欄位
      id: item?.id || "",
      created_at : item?.created_at ? convertDateTime(item?.created_at) : convertDateTime(),
      name : item?.name || "",
      permissions : item?.permissions ? [...item?.permissions].map(element => {
        const permissionObj = BasePermission(element)
        return permissionObj
      }) : []
    };
  };

  return factory(item||Role);
}

export default RoleFactory
