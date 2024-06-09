<template>
  <base-dialog v-model="isShowDialog" title="職稱詳情 : " @save="onSave" @hide="onHide">
    <base-form ref="form">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <input-text
            v-model="data.state.name"
            class="full-width"
            label="職稱 *"
            placeholder="請輸入職稱"
            required
          />
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { CompanyJobResource } from '@/@core/modules/company-job/api'
import { CompanyJob } from '@/@core/modules/company-job/models'
import useDialog from '@/hooks/useDialog'

const companyJobResource = CompanyJobResource({})

export default defineComponent({
  emits: ['save'],
  setup (props, { emit }) {
    // methods
    const readFetch = (id, query) => companyJobResource.get({id, query})
    const createFetch = (payload) => companyJobResource.post({payload})
    const updateFetch =  (id, payload) => companyJobResource.patch({id, payload})
    
    const onSave = async () => {
      const [res] = await save()
      if (res) emit('save')
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, showDialog, save } = useDialog({
      formData: CompanyJob(),
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })

    return {
      form,
      data,
      isShowDialog,
      showDialog,
      onSave,
      onHide,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
