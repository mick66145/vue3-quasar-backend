import Base from '@/@core/models/modules/Base2'

const Mailinfo = {
  ...Base,

  //api欄位
  id: "",
  name: "",
  subject: "",
  fromname: "",
  tomail: "",
  repeatname: "",
  repeatmail: "",
  cc: "",
  bcc: "",
  content_json: "",
  content: "",
}

const MailinfoFactory = (item = null) => {
  const factory = (item) => {
    return {
      //api欄位
      id : item?.id || "" ,
      name : item?.name || "" ,
      subject : item?.subject|| "" ,
      fromname : item?.fromname || "" ,
      tomail : item?.tomail || "" ,
      repeatname : item?.repeatname || "" ,
      repeatmail : item?.repeatmail || "" ,
      cc : item?.cc || "" ,
      bcc : item?.bcc || "" ,
      content : item?.content || "" ,
      content_json : item?.content_json ? JSON.parse(item?.content_json) : {}
    };
  };

  return factory(item || Mailinfo);
}

export default MailinfoFactory
