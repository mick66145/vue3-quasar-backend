import useResource from '@/hooks/useResource'
import { MailLog } from '@/@core/modules/mail-log/models'

export const MailLogResource = ({ 
  uri = 'mail_log'
}) => {
  const { list , get  } = useResource({uri , factory:MailLog})

  return {
    list,
    get,
  }
}

