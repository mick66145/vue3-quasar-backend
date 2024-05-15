<template>
  <q-page>
    <page-header>
      {{ $t('mail-log.title') }}
    </page-header>

    <q-card>
      <card-body>
        <mail-log-list-search-block
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
          @sort-change="OnChangeSort"
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
          <vxe-column title="操作" fixed="right" width="57">
            <template #default="{ row }">
              <div class="flex-center row">
                <view-icon-button
                  v-permission="['view mail_log']"
                  class="q-mr-xs q-mb-xs"
                  @click="showDialog({ id:row.id, mode:'edit', callRead:true })"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
    <mail-log-dialog ref="dialog" />
  </q-page>
</template>

<script>
import MailLogListSearchBlock from './components/MailLogListSearchBlock.vue'
import MailLogDialog from './components/MailLogDialog.vue'
import { MailLogResource } from '@/@core/modules/mail-log/api'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const mailLogResource = new MailLogResource()

export default defineComponent({
  components: {
    MailLogListSearchBlock,
    MailLogDialog,
  },
  setup () {
    // data
    const dialog = ref()
    const filter = reactive({
      keyword: null,
      date_range: null,
      start_date: null,
      end_date: null,
    })
    const tableFields = ref([
      { title: '寄送日期', field: 'send_datetime', min_width: '130' },
      { title: '寄件人信箱', field: 'from', min_width: '200' },
      { title: '收件人信箱', field: 'to', min_width: '130' },
      { title: '副本信箱', field: 'cc', min_width: '130' },
      { title: '密件副本信箱', field: 'bcc', min_width: '130' },
      { title: '信件主旨', field: 'subject', min_width: '200' },
      { title: '狀態', field: 'state_text', min_width: '130' },
    ])

    // methods
    const fetchData = async (payload) => {
      return await mailLogResource.list(payload).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }
    const refreshFetch = async () => {
      const filter = { ...search }
      filter.start_date = filter.date_range?.from ? filter.date_range.from : null
      filter.end_date = filter.date_range?.to ? filter.date_range.to : null
      await getDataList({ ...filter })
    }
    const showDialog = ({ id, mode, callRead }) => {
      dialog.value.showDialog({ id, mode, callRead })
    }

    const { dataTable, search, data, total, onChangePage, onChangeFilter, OnChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardMailLogServerDataTable',
      callback: refreshFetch,
    })

    const { callReadListFetch: getDataList } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      dialog,
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
      showDialog,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
