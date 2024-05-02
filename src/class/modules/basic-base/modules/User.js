import Base from '@/class/modules/Base'

class User extends Base {

  //api欄位
  id = "";
  name = "";
  account = "";
  password = "";
  email = "";
  is_enable = true;
  remark = "";
  role = "";
  company_job = "";
  company = "";

  constructor(obj) {
    super();
    if(obj){
      this.id = obj?.id
      this.name = obj?.name
      this.account = obj?.account
      this.password = obj?.password
      this.email = obj?.email
      this.is_enable = obj?.is_enable
      this.remark = obj?.remark
      this.role = obj?.role
      this.company_job = obj?.company_job
      this.company = obj?.company
    }
  }
}
export default User
