import area from './modules/area'
import auth from './modules/auth'
import file from './modules/file'
import menuPermission from './modules/menu-permission'
import platformAttribute from './modules/platform-attribute'
import countryCode from './modules/country-code'

export const exportBaseApiModules = () => {
  const modules = {}
  modules.AreaResource = area
  modules.AuthResource = auth
  modules.FileResource = file
  modules.MenuPermissionResource = menuPermission
  modules.PlatformAttributeResource = platformAttribute
  modules.CountryCodeResource = countryCode
  return modules
}
