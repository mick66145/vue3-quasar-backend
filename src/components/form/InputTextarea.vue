<template>
  <input-text
    v-model="observeValue"
    :placeholder="placeholder"
    :maxlength="65536"
    :required="required"
    type="textarea"
  />
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    placeholder: { type: String, default: '請輸入備註' },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
      emit,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-textarea {
  @apply py-10px;
}
</style>
