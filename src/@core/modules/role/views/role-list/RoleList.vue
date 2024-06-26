<template>
  <q-page>
    <page-header>
      {{ $t('role.title') }}
      <template #action>
        <add-button
          v-permission="['create role']"
          to="/role/create"
        />
      </template>
    </page-header>

    <q-card>
      <card-body>
        <role-list-search-block
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
                  v-permission="['update role']"
                  class="q-mr-xs q-mb-xs"
                  :to="'/role/edit/' + row.id"
                />
                <delete-icon-button
                  v-permission="['delete role']"
                  class="q-mr-xs q-mb-xs"
                  @click="onDelete(row)"
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
import RoleListSearchBlock from './components/RoleListSearchBlock.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { RoleResource } from '@core/modules/role/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const roleResource = RoleResource({})

export default defineComponent({
  components: {
    RoleListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '建立時間', field: 'created_at', min_width: '130' },
      { title: '權限群組名稱', field: 'name', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => roleResource.list({query})
    const delFetch =  (id) => roleResource.destroy({id})
    const refreshFetch = () => getDataList({ ...search })
    const onDelete = async (row) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除權限群組？' })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }
    
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset, onRefresh } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{field: 'id',order: 'desc',}],
      sessionStorageKey: 'dashboardRoleServerDataTable',
      callback: refreshFetch,
    })
    const { messageDelete } = useMessageDialog()
    const { callDeleteFetch, callReadListFetch: getDataList } = useCRUD({
      deleteFetch: delFetch,
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
      onDelete,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
