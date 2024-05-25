import Base from '@/@core/models/modules/Base'

class CompanyJob extends Base {

  //api欄位
  id = "";
  name = "";
  parent_job = "";

  constructor(obj) {
    super();
    if (obj) {
      this.id = obj?.id
      this.name = obj?.name
      this.parent_job = obj?.parent_job
    }
  }
}
export default CompanyJob
