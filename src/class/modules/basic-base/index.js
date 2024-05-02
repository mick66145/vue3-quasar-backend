import Company from './modules/Company'
import CompanyJob from './modules/CompanyJob'
import User from './modules/User'
import Role from './modules/Role'
import City from './modules/City'
import Area from './modules/Area'
import SystemRecordLog from './modules/SystemRecordLog'
import MenuPermission from './modules/menu-permission/MenuPermission'
import PlatformAttribute from './modules/PlatformAttribute'
import MailLog from './modules/MailLog'
import Mailinfo from './modules/Mailinfo'
import CountryCode from './modules/CountryCode'

export const exportBaseModules = () => {
  const modules = {}
  modules.Company = Company
  modules.CompanyJob = CompanyJob
  modules.User = User
  modules.Role = Role
  modules.City = City
  modules.Area = Area
  modules.SystemRecordLog = SystemRecordLog
  modules.MenuPermission = MenuPermission
  modules.PlatformAttribute = PlatformAttribute
  modules.MailLog = MailLog
  modules.Mailinfo = Mailinfo
  modules.CountryCode = CountryCode
  return modules
}
