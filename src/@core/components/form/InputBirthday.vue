<template>
  <input-date
    v-model="observeValue"
    :placeholder="placeholder"
    :max="max"
    :required="required"
  />
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
import { convertDateTime } from '@/utils/data-convert'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number] },
    placeholder: { type: String, default: '請選擇生日' },
    max: { type: [String], default: convertDateTime() },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
