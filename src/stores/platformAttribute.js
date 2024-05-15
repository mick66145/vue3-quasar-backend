import { PlatformAttributeResource } from '@/@core/modules/platform-attribute/api'
import { defineStore } from 'pinia'

export const usePlatformAttribute = defineStore({
  id: 'platformAttribute',
  state: () => ({
    platformAttributeResource: new PlatformAttributeResource(),
    platformAttribute: '',
  }),
  actions: {
    getPlatformAttribute () {
      return new Promise((resolve, reject) => {
        this.platformAttributeResource.get()
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
