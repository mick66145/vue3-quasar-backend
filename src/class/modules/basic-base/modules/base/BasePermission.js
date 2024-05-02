import Base from '@/class/modules/Base'
class BasePermission {
    //api
    id = ""            //權限ID
    name = ""          //權限名稱
    action = ""        //權限主要動作
    display_name = ""

    constructor(obj) {
        if (obj) {
            this.id = obj?.id;
            this.name = obj?.name;
            this.action = obj?.action;
            this.display_name = obj?.display_name;
        }
    }
}
export default BasePermission;
