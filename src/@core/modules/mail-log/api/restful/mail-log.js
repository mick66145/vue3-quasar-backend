import Resource from '@/@core/api/restful/resource'
import { MailLog } from '@/@core/modules/mail-log/models'

class MailLogResource extends Resource {
  constructor () {
    super('mail_log')
    this.setModel(MailLog)
  }
}

export default MailLogResource
