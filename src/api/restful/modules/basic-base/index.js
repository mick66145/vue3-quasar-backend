import menuPermission from './modules/menu-permission'

export const exportBaseApiModules = () => {
  const modules = {}
  modules.MenuPermissionResource = menuPermission
  return modules
}
