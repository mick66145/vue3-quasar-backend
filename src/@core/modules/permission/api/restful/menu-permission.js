import useResource from '@/hooks/useResource'
import { MenuPermission } from '@/@core/modules/permission/models'

export const MenuPermissionResource = ({ 
  uri = 'menu_permission'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:MenuPermission})

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll
  }
}



