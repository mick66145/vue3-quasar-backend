import useResource from '@/hooks/useResource'
import { CompanyJob } from '@/@core/modules/company-job/models'

export const CompanyJobResource = ({ 
  uri = 'company_job'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:CompanyJob})

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
