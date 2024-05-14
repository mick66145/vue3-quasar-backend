<template>
  <input-select
    v-model="observeValue"
    :options="userList"
    :required="required"
  />
</template>

<script>
import { baseApiModules } from '@/api'
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, onMounted } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'

const userResource = new baseApiModules.UserResource()

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const userList = ref([])

    // mounted
    onMounted(async () => {
      await callReadListFetch()
    })

    // methods
    const fetchData = async (payload) => {
      return await userResource.list(payload).then((res) => {
        userList.value = []
        userList.value = res.list
      })
    }
    const clearData = async () => {
      userList.value = []
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      userList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
