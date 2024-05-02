<template>
  <input-tel
    v-model="observeValue.phone"
    :label="label"
    :placeholder="placeholder"
    :outlined="false"
    :show-label="false"
    :required="required"
  >
    <template #before>
      <input-select
        v-model="observeValue.phone_country"
        class="w-5rem"
        :outlined="false"
        :options="countryCodeList"
        :clearable="false"
        emit-value
        option-label="country_phone_code"
        option-value="country_code"
      >
        <template #option="scope">
          <q-item v-bind="scope.scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.scope.opt.country_icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.scope.opt.country_name }}</q-item-label>
              <q-item-label caption>{{ scope.scope.opt.country_phone_code }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </input-select>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
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
  </input-tel>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { baseApiModules } from '@/api'
import useCRUD from '@/hooks/useCRUD'

const countryCodeResource = new baseApiModules.CountryCodeResource()

export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    label: { type: String, default: '手機號碼' },
    placeholder: { type: String, default: '請輸入手機號碼' },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const countryCodeList = ref([])

    // mounted
    onMounted(async () => {
      await callReadListFetch()
    })

    // methods
    const fetchData = async (payload) => {
      return await countryCodeResource.list(payload).then((res) => {
        countryCodeList.value = []
        countryCodeList.value = res.list
      })
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      countryCodeList,
      emit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
