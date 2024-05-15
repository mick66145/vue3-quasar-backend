<template>
  <base-dialog
    v-model="isShowDialog"
    title="信件紀錄詳情 : "
    :show-save="false"
    @save="onSave"
    @hide="onHide"
  >
    <span v-html="data.state.content" />
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { MailLogResource } from '@/@core/modules/mail-log/api'
import { MailLog } from '@/@core/modules/mail-log/models'
import useDialog from '@/hooks/useDialog'

const mailLogResource = new MailLogResource()

export default defineComponent({
  emits: ['save'],
  setup (props, { emit }) {
    // methods
    const readFetch = async (id, payload) => {
      return await mailLogResource.get(id, payload)
    }
    const onSave = async () => {
      const [res] = await save()
      if (res) emit('save')
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, showDialog, save } = useDialog({
      formData: new MailLog(),
      readFetch: readFetch,
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
