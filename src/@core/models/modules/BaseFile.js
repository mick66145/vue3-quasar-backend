import Base from '@core/models/modules/Base'

const BaseFile = {
    ...Base,
    //api欄位
    id : "",
    mime : "",
    name : "",
    size : "",
    url : "",

    //map欄位
    filename : "",
}

const BaseFileFactory = (item = null) => {
    const factory = (item) => {
        return {
            //api欄位
            id : item?.id || "",
            mime : item?.mime || "",
            name : item?.name || "",
            size : item?.size || "",
            url : item?.url || "",

            //map欄位
            filename : item?.name || "",
        };
    };
    return factory(item || BaseFile);
}

export default BaseFileFactory

