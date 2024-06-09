import Base from '@/@core/models/modules/Base'

const CompanyJob = {
  ...Base,
  id : "",
  name : "",
  parent_job : "",
}

const CompanyJobFactory = (item = null) => {
  const factory = (item) => {
    return {
      id: item?.id,
      name: item?.name,
      parent_job: item?.parent_job,
    };
  };

  return factory(item||CompanyJob);
}

export default CompanyJobFactory


