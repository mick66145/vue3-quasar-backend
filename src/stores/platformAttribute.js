import { defineStore } from 'pinia'
import { PlatformAttributeResource } from '@/@core/modules/platform-attribute/api'

export const usePlatformAttribute = defineStore({
  id: 'platformAttribute',
  state: () => ({
    platformAttributeResource : PlatformAttributeResource({}),
    platformAttribute: '',
  }),
  actions: {
    async getPlatformAttribute () {
      return new Promise((resolve, reject) => {
        this.platformAttributeResource.get({})
          .then(res => {
            this.platformAttribute = res
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },
  },

})
