<template>
  <q-page>
    <page-header showPrev showCancel showSave @save="onSubmit">
      公司資訊詳情
    </page-header>
    <base-form ref="form">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card class="h-full">
            <card-header>
              公司資訊
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-md-6 col-sm-12">
                  <input-text
                    v-model="formData.name"
                    required
                    class="full-width"
                    label="公司名稱 *"
                    placeholder="請輸入公司名稱"
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <input-text
                    v-model="formData.invoice"
                    class="full-width"
                    label="發票抬頭"
                    placeholder="請輸入發票抬頭"
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <input-text
                    v-model="formData.vatnumber"
                    class="full-width"
                    label="統一編號"
                    placeholder="請輸入統一編號"
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <input-text
                    v-model="formData.ceo"
                    class="full-width"
                    label="負責人"
                    placeholder="請輸入負責人"
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <input-date
                    v-model="formData.opendate"
                    class="full-width"
                    label="成立時間"
                    placeholder="請選擇成立時間"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div class="col-12">
          <q-card class="h-full">
            <card-header>
              客服資訊
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-md-6 col-sm-12">
                  <input-tel
                    v-model="formData.tel_service"
                    class="full-width"
                    label="客服電話"
                    placeholder="請輸入客服電話"
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <input-text
                    v-model="formData.service_time"
                    class="full-width"
                    label="客服時間"
                    placeholder="請輸入客服時間"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div class="col-12">
          <q-card>
            <card-header>
              聯絡資訊
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-md-6 col-sm-12">
                  <input-tel
                    v-model="formData.tel"
                    class="full-width"
                    label="主要電話"
                    placeholder="請輸入主要電話"
                  />
                </div>
                <div class="col-md-2 col-sm-12">
                  <input-text
                    v-model="formData.tel_ext"
                    class="full-width"
                    label="分機"
                    placeholder="請輸入分機"
                  />
                </div>
                <div class="col-md-4 col-sm-12">
                  <input-text
                    v-model="formData.fax"
                    class="full-width"
                    label="傳真"
                    placeholder="請輸入傳真"
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <input-text
                    v-model="formData.phone"
                    class="full-width"
                    label="手機"
                    placeholder="請輸入手機"
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <input-email
                    v-model="formData.email"
                    class="full-width"
                    label="Email"
                    placeholder="請輸入Email"
                  />
                </div>
                <div class="col-12">
                  <input-address
                    v-model="formData.address_obj"
                    showPostCode
                    label=""
                  />
                </div>
                <div class="col-12">
                  <input-text
                    v-model="formData.address_en"
                    class="full-width"
                    label="地址(英)"
                    placeholder="請輸入地址(英)"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
      </div>
    </base-form>
  </q-page>
  <fixed-footer go-back-route="/company" @save="onSubmit" />
</template>

<script>
import { defineComponent, ref, onMounted, toRefs } from 'vue-demi'
import { useRoute } from 'vue-router'
import { baseModules } from '@/class'
import { baseApiModules } from '@/api'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'

const companyResource = new baseApiModules.CompanyResource()

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref(new baseModules.Company())
    const fallBack = { name: 'CompanyList' }
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = async (id, payload) => {
      return await companyResource.get(id, payload)
    }
    const createFetch = async (payload) => {
      return await companyResource.post(payload)
    }
    const updateFetch = async (id, payload) => {
      return await companyResource.patch(id, payload)
    }
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = formData.value
          payload.setAddress()
          const urlObj = {
            create: () => { return callCreateFetch({ ...payload }) },
            edit: () => {
              return callUpdateFetch(id, { ...payload })
            },
          }
          const [res, error] = mode.value === 'create' ? await urlObj.create() : await urlObj.edit()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack({ fallBack })
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })

    return {
      form,
      formData,
      onSubmit,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
