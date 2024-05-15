import file from './modules/file'
import menuPermission from './modules/menu-permission'

export const exportBaseApiModules = () => {
  const modules = {}
  modules.FileResource = file
  modules.MenuPermissionResource = menuPermission
  return modules
}
