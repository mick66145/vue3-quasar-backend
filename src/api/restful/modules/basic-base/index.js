import auth from './modules/auth'
import file from './modules/file'
import menuPermission from './modules/menu-permission'
import countryCode from './modules/country-code'

export const exportBaseApiModules = () => {
  const modules = {}
  modules.AuthResource = auth
  modules.FileResource = file
  modules.MenuPermissionResource = menuPermission
  modules.CountryCodeResource = countryCode
  return modules
}
