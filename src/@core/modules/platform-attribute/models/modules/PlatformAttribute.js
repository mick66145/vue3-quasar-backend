import Base from '@core/models/modules/Base'

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
