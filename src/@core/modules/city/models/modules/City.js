import Base from '@/@core/models/modules/Base2'

const City = {
  ...Base,
  id : "",
  name : "",
}

const CityFactory = (item = null) => {
  const factory = (item) => {
    return {
      id: item?.id,
      name: item?.name,
    };
  };

  return factory(item||City);
}

export default CityFactory
