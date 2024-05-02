import BasePermission from '../base/BasePermission';
class Permission extends BasePermission {

    //map欄位
    is_active = false   //是否授權於此群組

    constructor(obj) {
        super(obj);
        if (obj) {
            this.is_active = obj?.is_active || false;
        }
    }
    setIsActive(value){
        this.is_active = value
    }
}
export default Permission;
