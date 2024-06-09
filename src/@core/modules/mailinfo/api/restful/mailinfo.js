import useResource from '@/hooks/useResource'
import { Mailinfo } from '@/@core/modules/mailinfo/models'

export const MailinfoResource = ({ 
  uri = 'mailinfo'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:Mailinfo})

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


