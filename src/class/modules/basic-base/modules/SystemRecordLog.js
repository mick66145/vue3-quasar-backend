import Base from '@/class/modules/Base'
import { convertDateTime } from '@/utils/data-convert'
class SystemRecordLog extends Base {

  //api欄位
  id = "";
  created_at = "";
  user = "";
  description = "";
  sourceip = "";
  
  constructor(obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit(obj) {
    this.id = obj.id
    this.created_at = convertDateTime(obj.created_at)
    this.user = obj.user
    this.description = obj.description
    this.sourceip = obj.sourceip
  }
}
export default SystemRecordLog
