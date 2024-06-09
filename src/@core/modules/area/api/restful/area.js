import useResource from '@/hooks/useResource'
import { Area } from '@/@core/modules/area/models'

export const AreaResource = ({ 
  uri = 'area'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:Area})

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

