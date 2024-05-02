<template>
  <q-uploader
    ref="uploader"
    :accept="accept"
    :max-file-size="maxFileSize"
    @added="onFile"
    @rejected="onRejected"
  >
    <template #header="scope">
      <base-button
        :label="buttonLabel"
        type="a"
        :icon="icon"
        :outline="outline"
        :rounded="rounded"
        @click="scope.pickFiles"
      >
        <q-uploader-add-trigger />
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
      </base-button>
    </template>
  </q-uploader>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'

export default defineComponent({
  props: {
    label: { type: String },
    icon: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: true },
    accept: {
      type: String,
      default: 'image/*, .csv,.xls,.xlsx, .doc,.docx,.pdf',
    },
    maxFileSize: { type: Number, default: 5120000 },
  },
  emits: ['on-file'],
  setup (props, { emit }) {
    const { notify } = useNotify()

    // data
    const { label } = toRefs(props)
    const uploader = ref()
    const reader = new FileReader()

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.add')
    })

    // methods
    const removeQueuedFiles = () => {
      uploader.value.removeQueuedFiles()
    }
    const onFile = (files) => {
      const file = files[0]
      const fileType = file.type
      console.log('🚀 ~ onFile ~ fileType', fileType)
      if (!props.accept.includes(fileType)) return notify({ message: '檔案格式錯誤', type: 'negative' })
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        emit('on-file', { file: file, base64: event.target.result })
      }
    }
    const onRejected = (rejectedEntries) => {
      const file = rejectedEntries[0].file
      const fileType = file.type
      const size = file.size
      if (!props.accept.includes(fileType)) return notify({ message: '檔案格式錯誤', type: 'negative' })
      if (size > props.maxFileSize) return notify({ message: '檔案大小超過可上傳大小', type: 'negative' })
    }

    return {
      buttonLabel,
      uploader,
      removeQueuedFiles,
      onFile,
      onRejected,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-uploader {
  width: inherit;
  box-shadow: none;

  &:deep(.q-uploader__header) {
    width: initial;

    @apply bg-transparent;
  }

  &:deep(.q-uploader__list) {
    display: none;
  }
}
</style>
