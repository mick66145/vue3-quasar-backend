import Base from '@/@core/models/modules/Base2'

const PlatformAttribute = {
  ...Base,
}

const PlatformAttributeFactory = (item = null) => {
  const factory = (item) => {
    return {

    };
  };

  return factory(item||PlatformAttribute);
}

export default PlatformAttributeFactory
