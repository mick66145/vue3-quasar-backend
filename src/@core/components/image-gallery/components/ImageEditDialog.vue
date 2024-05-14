<template>
  <base-dialog v-model="isShowDialog" title="編輯圖片 : " @save="onSave">
    <base-form ref="form">
      <div class="row">
        <div class="col-12">
          <input-text
            v-model="data.title"
            class="full-width"
            label="圖片標題"
            placeholder="請輸入圖片標題"
          />
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import useDialog from '@/hooks/useDialog'

export default defineComponent({
  emits: ['save'],
  setup (props, { emit }) {
    // data
    const data = ref()

    // methods
    const showDialog = async ({ data: imageData }) => {
      data.value = imageData
      isShowDialog.value = !isShowDialog.value
    }

    const onSave = () => {
      hideDialog()
    }

    // use
    const { isShowDialog, hideDialog } = useDialog({})

    return {
      data,
      isShowDialog,
      showDialog,
      onSave,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
