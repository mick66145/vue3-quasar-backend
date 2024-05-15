import Base from '@/@core/models/modules/Base'

class Mailinfo extends Base {

  //api欄位
  id = "";
  name = "";
  subject = "";
  fromname = "";
  tomail = "";
  repeatname = "";
  repeatmail = "";
  cc = "";
  bcc = "";
  content_json = "";
  content = "";
  
  constructor (obj) {
    super();
    if(obj){
      this.id = obj?.id
      this.name = obj?.name
      this.subject = obj?.subject
      this.fromname = obj?.fromname
      this.tomail = obj?.tomail
      this.repeatname = obj?.repeatname
      this.repeatmail = obj?.repeatmail
      this.cc = obj?.cc
      this.bcc = obj?.bcc
      this.content = obj?.content
      this.content_json = obj?.content_json ? JSON.parse(obj?.content_json) : {}
    }
  }
}
export default Mailinfo
