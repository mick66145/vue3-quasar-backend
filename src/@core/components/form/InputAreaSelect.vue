<template>
  <input-select
    v-model="observeValue"
    :options="areaList"
    :required="required"
  />
</template>

<script>
import { defineComponent, ref, onMounted, toRefs, watch } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { AreaResource } from '@/@core/modules/area/api'
import useCRUD from '@/hooks/useCRUD'

const areaResource = new AreaResource()

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    cityId: { type: [String, Number] },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { cityId } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const areaList = ref([])

    // mounted
    onMounted(async () => {
      if (cityId.value) {
        await callReadListFetch()
      }
    })

    // methods
    const fetchData = async () => {
      const payload = { city_id: cityId.value }
      return await areaResource.list(payload).then((res) => {
        areaList.value = []
        areaList.value = res.list
      })
    }
    const clearData = async () => {
      areaList.value = []
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    // watch
    watch(() => cityId.value, (newValue) => {
      if (newValue)fetchData()
    })

    return {
      observeValue,
      areaList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
