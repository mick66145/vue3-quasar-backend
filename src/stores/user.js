import { getToken, setToken, removeToken } from '@/@core/utils/auth'
import { defineStore } from 'pinia'
import useLogout from '@/hooks/useLogout'

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    info: '',
    permissionList: [],
    userResource: null,
    authResource: null,
  }),
  actions: {
    async initResources() {
      const { UserResource } = await import('@/@core/modules/user/api')
      const { AuthResource } = await import('@/@core/modules/auth/api')
      this.userResource = new UserResource()
      this.authResource = new AuthResource()
    },
    async login (payload) {
      if (!this.authResource) {
        await this.initResources()
      }
      return this.authResource.login(payload)
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },
    async register (payload) {
      if (!this.authResource) {
        await this.initResources()
      }
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.register(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },
    async forgetPassword (payload) {
      if (!this.authResource) {
        await this.initResources()
      }
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.forgetPassword(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    async getVerifyCode (payload) {
      if (!this.authResource) {
        await this.initResources()
      }
      /* 如果有註冊的api就使用以下註解 */
      // return this.authResource.getVerifyCode(payload)
      //   .then(res => {
      //     return res
      //   })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    async whoami () {
      if (!this.authResource) {
        await this.initResources()
      }
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

    async permission () {
      if (!this.authResource) {
        await this.initResources()
      }
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

    async profile (payload) {
      if (!this.authResource) {
        await this.initResources()
      }
      return this.authResource.profile(payload)
    },

    async changePassword (payload) {
      if (!this.authResource) {
        await this.initResources()
      }
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

    async logout () {
      if (!this.authResource) {
        await this.initResources()
      }
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

    async refreshToken (payload) {
      if (!this.authResource) {
        await this.initResources()
      }
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
