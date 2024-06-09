import Base from '@core/models/modules/Base'

const BaseImage = {
    ...Base,
    //api欄位
    id : "",
    title : "",
    alt : "",
    mime : "",
    name : "",
    size : "",
    url : "",
}

const BaseImageFactory = (item = null) => {
    const factory = (item) => {
        return {
            //api欄位
            id : item?.id || "",
            title : item?.title || "",
            alt : item?.alt || "",
            mime : item?.mime || "",
            name : item?.name || "",
            size : item?.size || "",
            url : item?.url || "",

        };
    };
    return factory(item || BaseImage);
}

export default BaseImageFactory


