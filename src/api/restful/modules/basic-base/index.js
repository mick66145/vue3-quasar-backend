import area from './modules/area'
import city from './modules/city'
import auth from './modules/auth'
import file from './modules/file'
import role from './modules/role'
import menuPermission from './modules/menu-permission'
import platformAttribute from './modules/platform-attribute'
import browserHistory from './modules/browser-history'
import countryCode from './modules/country-code'
export const exportBaseApiModules = () => {
  const modules = {}
  modules.AreaResource = area
  modules.AuthResource = auth
  modules.CityResource = city
  modules.FileResource = file
  modules.RoleResource = role
  modules.MenuPermissionResource = menuPermission
  modules.PlatformAttributeResource = platformAttribute
  modules.BrowserHistoryResource = browserHistory
  modules.CountryCodeResource = countryCode
  return modules
}
