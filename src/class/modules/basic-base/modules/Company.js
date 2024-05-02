import Base from '@/class/modules/Base'

class Company extends Base {

  //api欄位
  id = "";
  name = "";
  name_en = "";
  opendate = "";
  invoice = "";
  vatnumber = "";
  ceo = "";
  tel = "";
  tel_ext = "";
  tel_service = "";
  fax = "";
  phone = "";
  email = "";
  address = "";
  address_en = "";
  service_time = "";
  city = "";
  area = "";

  //map欄位
  address_obj = {
    city: '',
    area: '',
    address: '',
  }

  constructor(obj) {
    super()
    if (obj) {
      //api欄位
      this.id = obj?.id
      this.name = obj?.name
      this.name_en = obj?.name_en
      this.opendate = obj?.opendate
      this.invoice = obj?.invoice
      this.vatnumber = obj?.vatnumber
      this.ceo = obj?.ceo
      this.tel = obj?.tel
      this.tel_ext = obj?.tel_ext
      this.tel_service = obj?.tel_service
      this.fax = obj?.fax
      this.phone = obj?.phone
      this.email = obj?.email
      this.address = obj?.address
      this.address_en = obj?.address_en
      this.service_time = obj?.service_time
      this.city = obj?.city
      this.area = obj?.area

      //map欄位
      this.address_obj={
        city: this.city,
        area: this.area,
        address: this.address,
      }
      this.setAddressText()
    }
  }

  setAddress(){
    this.city = this.address_obj.city
    this.area = this.address_obj.area
    this.address = this.address_obj.address
  }

  setAddressText() {
    if (this.city || this.area || this.address) {
      let addressText = ''
      this.city && (addressText += `${this.city.name}`)
      this.area && (addressText += `${this.area.name}`)
      this.address && (addressText += `${this.address}`)
      this.address_text = addressText
    }
  }
}
export default Company
