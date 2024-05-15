import { baseApiModules } from '@/api'
import { UserResource } from '@/@core/modules/user/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'
import useLogout from '@/hooks/useLogout'

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    info: '',
    permissionList: [],
    userResource: new UserResource(),
    authResource: new baseApiModules.AuthResource(),
  }),
  actions: {

    login (payload) {
      return this.authResource.login(payload)
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },
    register (payload) {
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.register(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },
    forgetPassword (payload) {
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.forgetPassword(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    getVerifyCode (payload) {
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.getVerifyCode(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    whoami () {
      return new Promise((resolve, reject) => {
        this.authResource.me()
          .then(res => {
            const { data } = res
            if (!data) {
              reject(new Error('Verification failed, please Login again.'))
            }
            this.info = { ...data }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
    },

    permission () {
      return new Promise((resolve, reject) => {
        this.authResource.permission()
          .then(res => {
            const { list } = res
            this.permissionList = list.map(permission => { return permission.name })
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },

    profile (payload) {
      return this.authResource.profile(payload)
    },

    changePassword (payload) {
      return new Promise((resolve, reject) => {
        return this.authResource.changePassword(payload).then(res => {
          const { resetStore } = useLogout()
          resetStore()
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },

    logout () {
      /* 如果有登出的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   return this.authResource.logout().then(res => {
      //     this.clear()
      //     resolve()
      //   })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
      this.clear()
    },

    refreshToken (payload) {
      return this.authResource.refreshToken(payload)
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },

    setToken (token) {
      setToken(token)
      this.token = token
    },

    clear () {
      this.token = ''
      removeToken()
      this.$reset()
    },
  },

})
