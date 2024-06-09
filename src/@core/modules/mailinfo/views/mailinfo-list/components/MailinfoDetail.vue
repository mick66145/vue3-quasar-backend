<template>
  <q-page>
    <page-header showPrev showCancel showSave @save="onSubmit">
      信件詳情
    </page-header>
    <base-form ref="form">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-12">
          <q-card>
            <card-header>
              信件資訊
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.subject"
                    class="full-width"
                    label="信件主旨 *"
                    placeholder="請輸入信件主旨"
                    required
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.fromname"
                    class="full-width"
                    label="寄件者名稱"
                    placeholder="請輸入寄件者名稱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-email
                    v-model="formData.tomail"
                    class="full-width"
                    label="收件者信箱"
                    placeholder="請輸入收件者信箱"
                    required
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.repeatname"
                    class="full-width"
                    label="回覆者名稱"
                    placeholder="請輸入回覆者名稱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-email
                    v-model="formData.repeatmail"
                    class="full-width"
                    label="回覆者信箱"
                    placeholder="請輸入回覆者信箱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.cc"
                    class="full-width"
                    label="副本信箱"
                    placeholder="請輸入副本信箱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.bcc"
                    class="full-width"
                    label="密件副本信箱"
                    placeholder="請輸入密件副本信箱"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-card>
            <card-header>
              信件內文
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-xs-12 col-sm-12 col-md-12">
                  <input-editor
                    v-model="formData.content_json"
                    class="full-width"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
      </div>
    </base-form>
  </q-page>
  <fixed-footer @save="onSubmit" />
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { MailinfoResource } from '@core/modules/mailinfo/api'
import { Mailinfo } from '@core/modules/mailinfo/models'
import useCRUD from '@/hooks/useCRUD'
import useGoBack from '@/hooks/useGoBack'
import useDeltaConvert from '@/hooks/useDeltaConvert'

const mailinfoResource = MailinfoResource({})

export default defineComponent({
  components: {
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref(Mailinfo())
    const id = route.params.id || null
    
    // mounted
    onMounted(async () => {
      if (id) {
        const [res] = await callReadFetch(id)
        formData.value = res
      }
    })

    // methods
    const readFetch = (id, query) => mailinfoResource.get({id, query})
    const createFetch = (payload) => mailinfoResource.post({payload})
    const updateFetch = (id, payload) => mailinfoResource.patch({id, payload})
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          payload.content = payload.content_json ? renderHtml(payload.content_json?.ops || []) : ''
          payload.content_json = JSON.stringify(payload.content_json)
          const urlObj = {
            create: () => callCreateFetch({ ...payload }),
            edit: () => callUpdateFetch(id, { ...payload }),
          }
          const [res, error] = mode.value === 'create' ? await urlObj.create() : await urlObj.edit()
          if (res) goBack()
        }
      })
    }
    
    // use
    const { goBack } = useGoBack()
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })
    const { renderHtml } = useDeltaConvert()

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
