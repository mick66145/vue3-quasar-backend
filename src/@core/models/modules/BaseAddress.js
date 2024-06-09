import Base from '@/@core/models/modules/Base'

const BaseAddress = {
    ...Base,
    city: "",
    area: "",
    post_code: "",
    address: "",
}

const BaseAddressFactory = (item = null) => {
    const factory = (item) => {
        return {
            city: item?.city || "",
            area: item?.area || "",
            post_code: item?.post_code || "",
            address: item?.address || "",
        };
    };
    return factory(item || BaseAddress);
}

export default BaseAddressFactory
