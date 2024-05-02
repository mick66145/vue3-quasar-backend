<template>
  <q-btn round flat>
    <svg-icon icon="language" class="cursor-pointer" size="26" />
    <q-menu
      transition-show="scale"
      transition-hide="scale"
    >
      <q-list style="min-width: 100px;">
        <q-item
          v-for="{ lan, lanName } in lanList"
          :key="lan"
          v-close-popup
          :active="isActive(lan)"
          clickable
          @click="setLanguage(lan)"
        >
          <q-item-section>{{ lanName }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { locales } from '@/plugins/i18n'
import { defineComponent, ref } from 'vue-demi'
import { useApp } from '@/stores/app'
export default defineComponent({
  setup () {
    const { locale } = useI18n()
    const store = useApp()

    // data
    const lanList = ref([
      {
        lan: locales.tw,
        lanName: '繁體中文',
      },
      {
        lan: locales.en,
        lanName: 'English',
      },
    ])

    const setLanguage = (lang) => {
      console.log('🚀 ~ setLanguage ~ lang', lang)
      locale.value = lang
      store.setLanguage(lang)
    }

    // methods
    const isActive = (lang) => {
      return lang === locale.value
    }

    return {
      lanList,
      isActive,
      setLanguage,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
