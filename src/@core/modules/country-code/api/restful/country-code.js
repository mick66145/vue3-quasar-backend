import useResource from '@/hooks/useResource'
import { CountryCode } from '@/@core/modules/country-code/models'

export const CountryCodeResource = ({ 
  uri = 'country_code'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:CountryCode})

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


