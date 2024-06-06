<template>
  <q-page>
    <page-header>
      {{ $t('user.title') }}
      <template #action>
        <add-button
          v-permission="['create user']"
          to="/user/create"
        />
      </template>
    </page-header>

    <q-card>
      <card-body>
        <user-list-search-block
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
            :min-width="$q.screen.lt.sm ? min_width : 'auto'"
          />
          <vxe-column title="操作" fixed="right" :width="$q.screen.lt.sm ? 115 : 171">
            <template #default="{ row }">
              <div class="flex-center row">
                <edit-icon-button
                  v-permission="['update user']"
                  class="q-mr-xs q-mb-xs"
                  :to="'/user/edit/' + row.id"
                />
                <base-icon-button
                  v-permission="['update user']"
                  icon="key"
                  class="q-mr-xs q-mb-xs"
                  color="black"
                  :label="$t('g.btn.reset-password')"
                  @click="onResetPassword(row)"
                />
                <delete-icon-button
                  v-permission="['delete user']"
                  class="q-mb-xs"
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
import UserListSearchBlock from './components/UserListSearchBlock.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { UserResource } from '@/@core/modules/user/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const userResource = new UserResource()

export default defineComponent({
  components: {
    UserListSearchBlock,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })

    const tableFields = ref([
      { title: '帳號', field: 'account', min_width: '130' },
      { title: '姓名', field: 'name', min_width: '130' },
      { title: 'Email', field: 'email', min_width: '130' },
      { title: '所屬公司', field: 'company.name', min_width: '130' },
      { title: '權限群組', field: 'role.name', min_width: '130' },
    ])

    // methods
    const fetchData =  (payload) => userResource.list(payload)
    const delFetch = (id) => userResource.delete(id)
    const resetPasswordFetch = (id)=> userResource.resetPassword(id)
    const refreshFetch = () => callReadListFetch({ ...search })
    const onDelete = async (row) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除帳號？' })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }
    const onResetPassword = async (row) => {
      const res = await messageConfirm({ title: '重置密碼', message: '確認重置密碼？' })
      if (!res) return
      const [resetPasswordRes] = callResetPasswordFetch(row.id)
      if (resetPasswordRes) {await messageAlert({ title: '重置密碼成功', message: `密碼變更為 : ${resetPasswordRes.data.password}` })}
    }
    
    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset, onRefresh } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{field: 'created_at',order: 'desc',}],
      sessionStorageKey: 'dashboardUserServerDataTable',
      callback: refreshFetch,
    })
    const { messageAlert, messageConfirm, messageDelete } = useMessageDialog()

    const { callCreateFetch: callResetPasswordFetch, callReadListFetch, callDeleteFetch } = useCRUD({
      createFetch: resetPasswordFetch,
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
      onResetPassword,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
