<template>
  <q-page>
    <page-header>
      {{ $t('mailinfo.title') }}
    </page-header>

    <q-card>
      <card-body>
        <mailinfo-list-search-block
          v-model="search"
          class="q-mb-sm"
          @changeFilter="onChangeFilter"
          @reset="onReset"
        />
        <vxe-server-table
          ref="dataTable"
          class="q-mb-md"
          :data="data"
          :total="total"
          :current="search.page"
          @sort-change="OnChangeSort"
          @update:current="onChangePage"
        >
          <vxe-column
            v-for="{ field, title, min_width } in tableFields"
            :key="field"
            :field="field"
            :title="title"
            sortable
            :min-width="$q.screen.lt.sm ? min_width : 'auto'"
          />
          <vxe-column title="操作" fixed="right" width="57">
            <template #default="{ row }">
              <div class="flex-center row">
                <edit-icon-button
                  class="q-mr-xs q-mb-xs"
                  :to="`/mailinfo/edit/${row.id}`"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
  </q-page>
</template>

<script>
import MailinfoListSearchBlock from './components/MailinfoListSearchBlock.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { MailinfoResource } from '@/@core/modules/mailinfo/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const mailinfoResource = new MailinfoResource()

export default defineComponent({
  components: {
    MailinfoListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '信件名稱', field: 'name', min_width: '130' },
      { title: '信件主旨', field: 'subject', min_width: '130' },
      { title: '寄件者名稱', field: 'fromname', min_width: '130' },
      { title: '回覆者名稱', field: 'repeatname', min_width: '130' },
      { title: '回覆者信箱', field: 'repeatmail', min_width: '130' },
    ])
    // methods
    const fetchData = async (payload) => {
      return await mailinfoResource.list(payload).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }
    const refreshFetch = async () => {
      await getDataList({ ...search })
    }

    // use
    const { dataTable, search, data, total, onChangePage, onChangeFilter, OnChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardMailinfoServerDataTable',
      callback: refreshFetch,
    })
    const { callReadListFetch: getDataList } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      dataTable,
      tableFields,
      filter,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      OnChangeSort,
      onReset,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
