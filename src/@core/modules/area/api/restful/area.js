import useResource from '@/hooks/useResource'
import { Area } from '@core/modules/area/models'

export const AreaResource = ({ 
  uri = 'area'
}) => {
  const { list , get } = useResource({uri , factory:Area})

  return {
    list,
    get
  }
}

