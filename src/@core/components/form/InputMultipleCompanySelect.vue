<template>
  <input-multiple-select
    v-model="observeValue"
    :label="label"
    :options="companyList"
    :placeholder="placeholder"
    :required="required"
  />
</template>

<script>
import { baseApiModules } from '@/api'
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, onMounted } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'

const companyResource = new baseApiModules.CompanyResource()

export default defineComponent({
  props: {
    modelValue: { type: Array, default () { return [] } },
    label: { type: String, default: '公司' },
    placeholder: { type: String, default: '請選擇公司' },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const companyList = ref([])

    // mounted
    onMounted(async () => {
      await callReadListFetch()
    })

    // methods
    const fetchData = async (payload) => {
      return await companyResource.list(payload).then((res) => {
        companyList.value = []
        companyList.value = res.list
      })
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      companyList,
      fetchData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
