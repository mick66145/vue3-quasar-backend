import Base from '@/@core/models/modules/Base'

class BaseAddress extends Base {

    //api
    city = ''
    area = ''
    post_code = ''
    address = ''
    
    constructor(obj) {
        super();
        if (obj) {
            //api
            this.city = obj?.city;
            this.area = obj?.area;
            this.post_code = obj?.post_code;
            this.address = obj?.address;
        }
    }
}
export default BaseAddress;
