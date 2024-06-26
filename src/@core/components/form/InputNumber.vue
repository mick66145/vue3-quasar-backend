<template>
  <input-text
    v-model="observeValue"
    :label="inputLabel"
    type="number"
    :min="min"
    :max="max"
    :rules="ruleList"
    @clear="clearFn"
    @change="onChange"
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
import { vuelidate } from '@/plugins/vuelidate'
import useNotify from '@/hooks/useNotify'

export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number], default: 0 },
    rules: { type: Array, default () { return [] } },
    required: { type: Boolean, default: true },
    min: { type: [String, Number], default: 0 },
    max: { type: [String, Number] },
    useLabel: { type: Boolean, default: true },
    showMaxNotify: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const { label, rules, required, min, max, useLabel, showMaxNotify } = toRefs(props)

    // computed
    const ruleList = computed(() => {
      const rule = []
      required.value && rule.push(vuelidate.required(`${label.value}必填`))
      min.value && rule.push(vuelidate.minValue(min.value, `${label.value}必需大於${min.value}`))
      max.value && rule.push(vuelidate.maxValue(max.value, `${label.value}必需小於${max.value}`))
      return rule.concat(rules.value)
    })
    const observeValue = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        if (value === '' || value === null) {
          emit('update:modelValue', 0)
          return
        }
        emit('update:modelValue', +value)
      },
    })
    const inputLabel = computed(() => {
      return useLabel.value ? label.value : undefined
    })

    const clearFn = (val) => {
      emit('update:modelValue', required.value ? (min.value ? min.value : 0) : null)
    }
    const onChange = (val) => {
      (showMaxNotify.value && max.value && val >= max.value) && customNotify({ message: '已達上限', icon: null, color: 'grey-8' })
    }

    // use
    const { customNotify } = useNotify()

    return {
      observeValue,
      ruleList,
      inputLabel,
      clearFn,
      onChange,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-input {
  @apply py-10px;
}
</style>
