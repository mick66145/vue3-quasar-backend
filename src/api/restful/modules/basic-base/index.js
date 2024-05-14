import area from './modules/area'
import city from './modules/city'
import auth from './modules/auth'
import companyJob from './modules/company-job'
import file from './modules/file'
import role from './modules/role'
import system from './modules/system'
import user from './modules/user'
import menuPermission from './modules/menu-permission'
import platformAttribute from './modules/platform-attribute'
import mailLog from './modules/mail-log'
import mailinfo from './modules/mailinfo'
import browserHistory from './modules/browser-history'
import countryCode from './modules/country-code'
export const exportBaseApiModules = () => {
  const modules = {}
  modules.AreaResource = area
  modules.AuthResource = auth
  modules.CityResource = city
  modules.CompanyJobResource = companyJob
  modules.FileResource = file
  modules.RoleResource = role
  modules.SystemResource = system
  modules.UserResource = user
  modules.MenuPermissionResource = menuPermission
  modules.PlatformAttributeResource = platformAttribute
  modules.MailLogResource = mailLog
  modules.MailinfoResource = mailinfo
  modules.BrowserHistoryResource = browserHistory
  modules.CountryCodeResource = countryCode
  return modules
}
