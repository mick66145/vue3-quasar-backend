const BasePermission = {
    id : "",
    name : "",
    action : "",
    display_name : ""
}

const BasePermissionFactory = (item = null) => {
  const factory = (item) => {
    return {
      id: item?.id || "",
      name: item?.name || "",
      action: item?.action || "",
      display_name : item?.display_name || "",
    };
  };

  return factory(item||BasePermission);
}

export default BasePermissionFactory
