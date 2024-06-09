import useResource from '@/hooks/useResource'
import { City } from '@/@core/modules/city/models'

export const CityResource = ({ 
  uri = 'city'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:City})

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


