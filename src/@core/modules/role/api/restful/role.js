import useResource from '@/hooks/useResource'
import { Role } from '@core/modules/role/models'

export const RoleResource = ({ 
  uri = 'role'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:Role})

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


