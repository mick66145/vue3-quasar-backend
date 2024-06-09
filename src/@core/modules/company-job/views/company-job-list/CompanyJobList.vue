<template>
  <q-page>
    <page-header>
      {{ $t('company-job.title') }}
      <template #action>
        <add-button
          v-permission="['create company_job']"
          @click="showDialog({})"
        />
      </template>
    </page-header>

    <q-card>
      <card-body>
        <company-job-list-search-block
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
          <vxe-column title="操作" fixed="right" width="115">
            <template #default="{ row }">
              <div class="flex-center row">
                <edit-icon-button
                  v-permission="['update company_job']"
                  class="q-mr-xs q-mb-xs"
                  @click="showDialog({ id:row.id, mode:'edit', callRead:true })"
                />
                <delete-icon-button
                  v-permission="['delete company_job']"
                  class="q-mr-xs q-mb-xs"
                  @click="onDelete(row)"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
    <company-job-dialog ref="dialog" @save="onRefresh" />
  </q-page>
</template>

<script>
import CompanyJobListSearchBlock from './components/CompanyJobListSearchBlock.vue'
import CompanyJobDialog from './components/CompanyJobDialog.vue'
import { CompanyJobResource } from '@core/modules/company-job/api'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const companyJobResource = CompanyJobResource({})

export default defineComponent({
  components: {
    CompanyJobListSearchBlock,
    CompanyJobDialog,
  },
  setup () {
    // data
    const dialog = ref()
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '職稱', field: 'name', min_width: '130' },
    ])
    
    // methods
    const fetchData = (query) => companyJobResource.list({query})
    const delFetch = (id) => companyJobResource.destroy({id})
    const refreshFetch = () => getDataList({ ...search })
    const onDelete = async (row) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除職稱？' })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }
    const showDialog = ({ id, mode, callRead }) => {
      dialog.value.showDialog({ id, mode, callRead })
    }
    
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset,onRefresh } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardCompanyJobServerDataTable',
      callback: refreshFetch,
    })
    const { messageDelete } = useMessageDialog()
    const { callDeleteFetch, callReadListFetch: getDataList } = useCRUD({
      deleteFetch: delFetch,
      readListFetch: fetchData,
    })

    return {
      dataTable,
      dialog,
      tableFields,
      filter,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      onChangeSort,
      onReset,
      onRefresh,
      onDelete,
      showDialog
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
