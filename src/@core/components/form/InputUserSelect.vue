<template>
  <input-select
    v-model="observeValue"
    :options="userList"
    :required="required"
  />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { UserResource } from '@/@core/modules/user/api'
import { useVModel } from '@vueuse/core'
import useCRUD from '@/hooks/useCRUD'

const userResource = new UserResource()

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
    onMounted(() => {
      callReadListFetch()
    })

    // methods
    const fetchData = () => {
      const payload = {orderby: "created_at:desc"} 
      return userResource.list(payload).then((res) => {
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
