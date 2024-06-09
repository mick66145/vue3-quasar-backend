import Base from '@core/models/modules/Base'

const User = {
  ...Base,
  id : "",
  name : "",
  account : "",
  password : "",
  email : "",
  is_enable : true,
  remark : "",
  role : "",
  company_job : "",
  company : "",
}

const UserFactory = (item = null) => {
  const factory = (item) => {
    return {
      id: item?.id,
      name: item?.name,
      account: item?.account,
      password : item?.password,
      email : item?.email,
      is_enable : item?.is_enable,
      remark : item?.remark,
      role : item?.role,
      company_job : item?.company_job,
      company : item?.company,
    };
  };

  return factory(item||User);
}

export default UserFactory

