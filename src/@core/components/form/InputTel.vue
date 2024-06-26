<template>
  <input-text
    v-model="observeValue"
    :label="inputLabel"
    :rules="ruleList"
    :required="required"
    type="tel"
  >
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="$slots.counter" #counter>
      <slot name="counter" />
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
  </input-text>
</template>

<script>

import { defineComponent, computed, toRefs } from 'vue-demi'
import { useVModel, toReactive } from '@vueuse/core'
import { vuelidate } from '@/plugins/vuelidate'

export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number], default: 0 },
    rules: { type: Array, default () { return [] } },
    showLabel: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const { rules } = toRefs(props)
    const { showLabel, label } = toReactive(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const ruleList = computed(() => {
      const rule = [
        vuelidate.regex(/^[0-9\-()+]+$/, '格式錯誤，只允許數字、連字符、左括號、右括號、加號'),
      ]
      return rule.concat(rules.value)
    })
    const inputLabel = computed(() => {
      return showLabel ? label : undefined
    })

    return {
      observeValue,
      ruleList,
      inputLabel,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
