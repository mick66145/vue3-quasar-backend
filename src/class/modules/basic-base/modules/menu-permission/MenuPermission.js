import Base from '@/@core/models/modules/Base'
import Permission from './Permission';
class MenuPermission extends Base {

    //api
    id = ""
    name = ""
    childs = []
    permissions = []

    //map欄位
    allSelectd = false

    constructor(obj) {
        super();
        if (obj) {
            this.id = obj?.id;
            this.name = obj?.name;
            this.childs = [...obj?.childs].map(element => {
                const menuPermissionObj = new MenuPermission(element)
                return menuPermissionObj
            });
            this.permissions = [...obj?.permissions].map(element => {
                const permissionObj = new Permission(element)
                return permissionObj
            })
        }
    }
    setAllSelectd(){
        this.allSelectd = this.permissions.every(element=>element.is_active)
    }
    setPermission(permissions) {
        this.permissions.forEach(element => { (permissions.includes(element.id)) && (element.setIsActive(true)) })
        this.setAllSelectd()
        if (this.childs.length > 0 )this.childs.forEach(element => { element.setPermission(permissions)})
    }
    onSelectAll(value) {
        this.permissions.forEach(element => { element.setIsActive(value)})
        this.setAllSelectd()
        if (this.childs.length > 0 )this.childs.forEach(element => { element.onSelectAll(value)})
    }
    everyAllSelectd(){
        return this.allSelectd && (this.childs.length === 0 ? true: this.childs.every(element => element.everyAllSelectd()))
    }
    refreshAllSelectd(){
        this.setAllSelectd()
        if (this.childs.length > 0 )this.childs.forEach(element => { element.refreshAllSelectd()})
    }
}
export default MenuPermission;
