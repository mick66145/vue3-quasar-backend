<template>
  <q-page class="flex flex-center">
    <q-card
      class="shadow-0 w-3/10 <sm:w-4/5 <md:w-3/5 "
    >
      <q-card-section>
        <div class="text-center">
          <div class="col text-h5 ellipsis">{{ $t('g.system.system-name') }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <base-form ref="form" class="q-gutter-md">
          <input-text
            v-model="formData.account"
            :label="$t('login.loginForm.account')"
            lazy-rules
            required
          />

          <input-password
            v-model="formData.password"
            :label="$t('login.loginForm.password')"
            lazy-rules
            required
            @keyup.enter="handleRegister"
          />

          <div>
            <base-button class="w-full q-mb-md" :label="$t('entry.register.btn.register')" @click.prevent="handleRegister" />
            <div class="text-center"><router-link class="text-black no-underline" to="/login">返回登入</router-link></div>
          </div>
        </base-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import useCRUD from '@/hooks/useCRUD'

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useUser()

    // data
    const formData = reactive({
      account: '',
      password: '',
    })

    // methods
    const createFetch = async (payload) => {
      return await store.register(payload)
    }
    const handleRegister = () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData }
          const urlObj = {
            register: () => { return callCreateFetch({ ...payload }) },
          }
          const [res, error] = await urlObj.register()
          if (res) router.push('/login')
        }
      })
    }

    // use
    const { form, callCreateFetch } = useCRUD({
      createSuccess: '註冊成功',
      createFetch: createFetch,
    })

    return {
      form,
      formData,
      handleRegister,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
