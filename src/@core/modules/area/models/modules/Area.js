import Base from '@/@core/models/modules/Base'

class Area extends Base {

  //api欄位
  id = "";
  name = "";
  detail = "";
  
  constructor(obj) {
    super();
    if(obj){
      this.id = obj?.id
      this.name = obj?.name
      this.detail = obj?.detail
    }
  }
}
export default Area
