<template>
  <q-page>
    <page-header showPrev showCancel>
      個人資料
    </page-header>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-12">
        <q-card>
          <card-header>
            帳號資訊
            <template #action>
              <base-button label="儲存資訊" @click="onSubmit" />
            </template>
          </card-header>
          <card-body class="q-pt-none">
            <base-form ref="infoForm">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input-text
                    v-model="formData.account"
                    class="full-width"
                    label="帳號 *"
                    placeholder="請輸入帳號"
                    required
                    disable
                  />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input-text
                    v-model="formData.name"
                    class="full-width"
                    label="人員名稱 *"
                    placeholder="請輸入人員名稱"
                    required
                  />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input-email
                    v-model="formData.email"
                    class="full-width"
                    label="Email"
                    placeholder="請輸入Email"
                  />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                  <input-textarea
                    v-model="formData.remark"
                    class="full-width"
                    label="備註"
                  />
                </div>
              </div>
            </base-form>
          </card-body>
        </q-card>
      </div>
      <div class="col-12">
        <q-card>
          <card-header>
            變更密碼
            <template #action>
              <base-button label="變更密碼" @click="onChangePassword" />
            </template>
          </card-header>
          <card-body class="q-pt-none">
            <base-form ref="changePasswordForm">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input-password
                    v-model="changePasswordformData.old_password"
                    class="full-width"
                    label="舊密碼 *"
                    autocomplete="new-password"
                    placeholder="請輸入舊密碼"
                    required
                  />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input-password
                    v-model="changePasswordformData.new_password"
                    class="full-width"
                    label="新密碼 *"
                    autocomplete="new-password"
                    placeholder="請輸入新密碼"
                    required
                    :rules="[
                      $rules.regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)(?!.* ).{8,}$/i,'格式錯誤，新密碼需為 8 至 255 個字元長度，包含數字、英文字母和特殊符號')
                    ]"
                  >
                    <template #hint>
                      新密碼需為 8 至 255 個字元長度，包含數字、英文字母和特殊符號。
                    </template>
                  </input-password>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input-password
                    v-model="changePasswordformData.confirm_password"
                    class="full-width"
                    label="確認新密碼 *"
                    autocomplete="new-password"
                    placeholder="請輸入確認新密碼"
                    required
                    :rules="[
                      $rules.sameAs(changePasswordformData.new_password,'與新密碼不相符')
                    ]"
                  />
                </div>
              </div>
            </base-form>
          </card-body>
        </q-card>
      </div>
    </div>
  </q-page>
  <fixed-footer :show-save="false" @save="onSubmit" />
</template>

<script>

import { defineComponent, reactive } from 'vue-demi'
import { useUser } from '@/stores/user'
import useCRUD from '@/hooks/useCRUD'
import useLogout from '@/hooks/useLogout'
export default defineComponent({
  setup () {
    // data
    const store = useUser()
    const formData = reactive({ ...store.info })
    const changePasswordformData = reactive({
      old_password: '',
      new_password: '',
      confirm_password: '',
    })

    // methods
    const updateFetch = (payload) => store.profile(payload)
    const changePasswordetch = (payload) => store.changePassword(payload)
    const onSubmit = async () => {
      infoForm.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData }
          const urlObj = {
            edit: () => callUpdateFetch({ ...payload }),
          }
          urlObj.edit()
        }
      })
    }
    const onChangePassword = async () => {
      changePasswordForm.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...changePasswordformData }
          const urlObj = {
            changePassword: () => callChangePasswordFetch({ ...payload }),
          }
          const [res] = await urlObj.changePassword()
          if(res) resetStore()
        }
      })
    }

    // use
    const { form: infoForm, callUpdateFetch } = useCRUD({
      updateFetch: updateFetch,
    })
    const { form: changePasswordForm, callCreateFetch: callChangePasswordFetch } = useCRUD({
      createSuccess: '修改密碼成功',
      createFetch: changePasswordetch,
    })
    const { resetStore } = useLogout()

    return {
      infoForm,
      changePasswordForm,
      formData,
      changePasswordformData,
      onSubmit,
      onChangePassword,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
