import useResource from '@/hooks/useResource'
import { Company } from '@/@core/modules/company/models'

export const CompanyResource = ({ 
  uri = 'company'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:Company})

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


