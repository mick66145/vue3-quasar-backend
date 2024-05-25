import Resource from '@/@core/api/restful/resource'
import { Mailinfo } from '@/@core/modules/mailinfo/models'

class MailinfoResource extends Resource {
  constructor () {
    super('mailinfo')
    this.setModel(Mailinfo)
  }
}

export default MailinfoResource
