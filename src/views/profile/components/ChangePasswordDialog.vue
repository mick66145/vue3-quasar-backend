<template>
  <base-dialog
    v-model="isShowDialog"
    title="修改密碼"
    confirmButtonText="送出"
    @save="onSave"
    @hide="onHide"
  >
    <base-form ref="form">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-item>
            <input-password
              v-model="data.state.old_password"
              class="full-width"
              label="舊密碼 *"
              placeholder="請輸入舊密碼"
              required
            />
          </q-item>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-item>
            <input-password
              v-model="data.state.new_password"
              class="full-width"
              label="新密碼 *"
              placeholder="請輸入新密碼"
              required
            />
          </q-item>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-item>
            <input-password
              v-model="data.state.confirm_password"
              class="full-width"
              label="確認新密碼 *"
              placeholder="請輸入確認新密碼"
              required
              :rules="[
                $rules.sameAs(data.state.new_password,'與新密碼不相符')
              ]"
            />
          </q-item>
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useUser } from '@/stores/user'
import useDialog from '@/hooks/useDialog'
import useLogout from '@/hooks/useLogout'

export default defineComponent({
  emits: ['save'],
  setup (props, { emit }) {
    // data
    const store = useUser()

    // methods
    const createFetch = (payload) => store.changePassword(payload)
    const onSave = async () => {
      const [res] = await save()
      if (res) resetStore()
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, mode, data, isShowDialog, showDialog, save } = useDialog({
      formData: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      createSuccess: '修改密碼成功',
      createFetch: createFetch,
    })
    // use
    const { resetStore } = useLogout()

    return {
      form,
      mode,
      data,
      isShowDialog,
      showDialog,
      onSave,
      onHide,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
