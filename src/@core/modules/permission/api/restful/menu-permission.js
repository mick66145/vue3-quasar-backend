import Resource from '@/@core/api/restful/resource'
import request from '@/@core/utils/request'
import { MenuPermission } from '@/@core/modules/permission/models'

class MenuPermissionResource extends Resource {
  constructor () {
    super('menu_permission')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const menuPermissionObj = new MenuPermission(element)
          return menuPermissionObj
        })
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return { list: list }
        }
      },
      )
  }
}

export default MenuPermissionResource
