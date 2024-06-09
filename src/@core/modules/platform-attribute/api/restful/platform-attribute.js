import useResource from '@/hooks/useResource'
import { PlatformAttribute } from '@core/modules/platform-attribute/models'

export const PlatformAttributeResource = ({ 
  uri = 'platform_attribute'
}) => {
  const { list , get , post , patch , put , destroy } = useResource({uri , factory:PlatformAttribute})

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy
  }
}


