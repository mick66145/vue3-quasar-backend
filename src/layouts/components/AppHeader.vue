<template>
  <q-header class="bg-grey-2 text-blue-grey-7">
    <q-toolbar class="lg:pl-0">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggle"
      />
      <q-space />
      <div class="row text-blue-grey-7 q-gutter-sm items-center no-wrap">
        <!-- <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
          /> -->
        <lang-select v-if="isShow.langSelect" />
        <user-info-item />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import UserInfoItem from './UserInfoItem.vue'
import { defineComponent, reactive } from 'vue-demi'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import useLogout from '@/hooks/useLogout'
export default defineComponent({
  components: {
    UserInfoItem,
  },
  setup (props, { emit }) {
    // data
    const storeApp = useApp()
    const storeUser = useUser()
    const userInfo = reactive(storeUser.info)
    const isShow = reactive({
      langSelect: false,
    })

    // methods
    const toggle = () => {
      storeApp.toggleSideBar()
    }

    const logout = () => {
      resetStore()
    }

    // use
    const { resetStore } = useLogout()

    return {
      userInfo,
      isShow,
      toggle,
      logout,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
