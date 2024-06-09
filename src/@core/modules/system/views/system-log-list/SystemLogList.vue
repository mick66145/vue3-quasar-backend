<template>
  <q-page>
    <page-header>
      {{ $t('operate-log.title') }}
    </page-header>

    <q-card>
      <card-body>
        <system-log-list-search-block
          v-model="search"
          class="q-mb-sm"
          @changeFilter="onChangeFilter"
          @reset="onReset"
        />
        <vxe-server-table
          ref="dataTable"
          :data="data"
          :total="total"
          :current="search.page"
          @sort-change="onChangeSort"
          @update:current="onChangePage"
        >
          <vxe-column
            v-for="{ field, title, min_width } in tableFields"
            :key="field"
            :field="field"
            :title="title"
            sortable
            :min-width="min_width"
          />
        </vxe-server-table>
      </card-body>
    </q-card>
  </q-page>
</template>

<script>
import SystemLogListSearchBlock from './components/SystemLogListSearchBlock.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { SystemResource } from '@core/modules/system/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const systemResource = SystemResource({})

export default defineComponent({
  components: {
    SystemLogListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '操作人員', field: 'user.name', min_width: '130' },
      { title: '帳號', field: 'user.account', min_width: '130' },
      { title: '操作日期', field: 'created_at', min_width: '130' },
      { title: '操作描述', field: 'description', min_width: '130' },
      { title: 'IP位置', field: 'sourceip', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => systemResource.recordLoglist({query})
    const refreshFetch = () => getDataList({ ...search })

    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc',}],
      sessionStorageKey: 'dashboardSystemLogServerDataTable',
      callback: refreshFetch,
    })
    const { callReadListFetch: getDataList } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      dataTable,
      tableFields,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      onChangeSort,
      onReset,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
