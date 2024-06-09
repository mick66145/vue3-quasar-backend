import Base from '@/@core/models/modules/Base'
import { convertDateTime } from '@/utils/data-convert'

const MailLog = {
  ...Base,
  id : "",
  from : "",
  to : "",
  cc : "",
  bcc : "",
  reply_to : "",
  subject : "",
  send_datetime : "",
  content : "",
  state : "",
  state_text : "",
}

const MailLogFactory = (item = null) => {
  const factory = (item) => {
    return {
      id : item?.id || "",
      from : item?.from || "",
      to : item?.to || "",
      cc : item?.cc || "",
      bcc : item?.bcc || "",
      reply_to : item?.reply_to || "",
      subject : item?.subject || "",
      send_datetime : item?.send_datetime ? convertDateTime(obj?.send_datetime) : convertDateTime(),
      content : item?.content || "",
      state : item?.state || "",
      state_text : item?.state_text || "",
    };
  };

  return factory(item || MailLog);
}

export default MailLogFactory
