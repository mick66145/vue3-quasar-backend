import Base from '@/@core/models/modules/Base2'

const Area = {
  ...Base,
  id : "",
  name : "",
  detail : "",
}

const AreaFactory = (item = null) => {
  const factory = (item) => {
    return {
      id: item?.id,
      name: item?.name,
      detail: item?.detail,
    };
  };

  return factory(item||Area);
}

export default AreaFactory