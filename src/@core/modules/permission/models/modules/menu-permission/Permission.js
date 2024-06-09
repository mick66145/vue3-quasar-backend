import BasePermission from '../BasePermission';

const Permission = {
    ...BasePermission(),
    is_active: false,
}

const PermissionFactory = (item = null) => {
    const factory = (item) => {
        return {
            ...BasePermission(item),
            is_active: item?.is_active || false,
            setIsActive(value){
                this.is_active = value
            }
        };
    };
    return factory(item || Permission);
}

export default PermissionFactory