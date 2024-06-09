import useResource from '@/hooks/useResource'
import { MailLog } from '@/@core/modules/mail-log/models'

export const MailLogResource = ({ 
  uri = 'mail_log'
}) => {
  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:MailLog})

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

