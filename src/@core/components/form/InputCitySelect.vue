<template>
  <input-select
    v-model="observeValue"
    :options="cityList"
    :required="required"
  />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { CityResource } from '@core/modules/city/api'
import useCRUD from '@/hooks/useCRUD'

const cityResource = CityResource({})

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const cityList = ref([])

    // mounted
    onMounted(async () => {
      callReadListFetch()
    })

    // methods
    const fetchData = (query) => {
      return cityResource.list({query}).then((res) => {
        cityList.value = []
        cityList.value = res.list
      })
    }
    const clearData = async () => {
      cityList.value = []
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      cityList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
