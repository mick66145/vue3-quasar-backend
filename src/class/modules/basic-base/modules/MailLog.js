import Base from '@/class/modules/Base'
import { convertDateTime } from '@/utils/data-convert'

class MailLog extends Base {

  //api欄位
  id = "";
  from = "";
  to = "";
  cc = "";
  bcc = "";
  reply_to = "";
  subject = "";
  send_datetime = "";
  content = "";
  state = "";
  state_text = "";

  constructor (obj) {
    super();
    if (obj) {
      this.id = obj?.id
      this.from = obj?.from
      this.to = obj?.to
      this.cc = obj?.cc
      this.bcc = obj?.bcc
      this.reply_to = obj?.reply_to
      this.subject = obj?.subject
      this.send_datetime = obj?.send_datetime && convertDateTime(obj?.send_datetime)
      this.content = obj?.content
      this.state = obj?.state
      this.state_text = obj?.state_text
    }
  }
}
export default MailLog
