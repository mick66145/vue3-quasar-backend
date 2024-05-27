import { defineStore } from 'pinia'

export const usePlatformAttribute = defineStore({
  id: 'platformAttribute',
  state: () => ({
    platformAttributeResource: null,
    platformAttribute: '',
  }),
  actions: {
    async initResources() {
      const { PlatformAttributeResource } = await import('@/@core/modules/platform-attribute/api');
      this.platformAttributeResource = new PlatformAttributeResource();
    },
    async getPlatformAttribute () {
      if (!this.authResource) {
        await this.initResources()
      }
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
