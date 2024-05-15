import Base from '@/@core/models/modules/Base'

class CountryCode extends Base {

  //api欄位
  country_code = "";
  country_name = "";
  country_phone_code = "";
  country_icon = "";

  //map欄位
  name_text = ""

  constructor(obj) {
    super();
    if (obj) {
      //api欄位
      this.country_code = obj?.country_code
      this.country_name = obj?.country_name
      this.country_phone_code = obj?.country_phone_code
      this.country_icon = obj?.country_icon

      //map欄位
      this.name_text = `${this.country_phone_code}(${this.country_name})`
    }
  }
}
export default CountryCode
