import Base from '@core/models/modules/Base'

const Company = {
  ...Base,
  id: "",
  name: "",
  name_en: "",
  opendate: "",
  invoice: "",
  vatnumber: "",
  ceo: "",
  tel: "",
  tel_ext: "",
  tel_service: "",
  fax: "",
  phone: "",
  email: "",
  address: "",
  address_en: "",
  service_time: "",
  city: "",
  area: "",

  //map欄位
  address_obj: {
    city: "",
    area: "",
    address: "",
  }
}

const CompanyFactory = (item = null) => {
  const factory = (item) => {
    const companyObj = {
      //api欄位
      id: item?.id || "",
      name: item?.name || "",
      name_en: item?.name_en || "",
      opendate: item?.opendate || "",
      invoice: item?.invoice || "",
      vatnumber: item?.vatnumber || "",
      ceo: item?.ceo || "",
      tel: item?.tel || "",
      tel_ext: item?.tel_ext || "",
      tel_service: item?.tel_service || "",
      fax: item?.fax || "",
      phone: item?.phone || "",
      email: item?.email || "",
      address: item?.address || "",
      address_en: item?.address_en || "",
      service_time: item?.service_time || "",
      city: item?.city || "",
      area: item?.area || "",

      //map欄位
      address_obj: {
        city: item?.city || "",
        area: item?.area || "",
        address: item?.address || "",
      },

      setAddress() {
        this.city = this.address_obj.city
        this.area = this.address_obj.area
        this.address = this.address_obj.address
      },

      setAddressText() {
        if (this.city || this.area || this.address) {
          let addressText = ''
          this.city && (addressText += `${this.city?.name}`)
          this.area && (addressText += `${this.area?.name}`)
          this.address && (addressText += `${this.address}`)
          this.address_text = addressText
        }
      }
    };
    companyObj.setAddressText()
    return companyObj;
  };

  return factory(item || Company);
}

export default CompanyFactory
