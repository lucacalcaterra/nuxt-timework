<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'

import type { Timbratura } from '~/types'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  middleware: ['authenticated']
})

const {
  data,
  pending: _pending,
  error: _error,
  refresh: _refresh
} = await useFetch<Timbratura[]>('/api/timbrature/byday')

const table = useTemplateRef('table')

const columns: TableColumn<Timbratura>[] = [
  {
    accessorKey: 'Data',
    header: 'Data',
    cell: ({ row }) => `${row.getValue('Data')}`
  },
  {
    accessorKey: 'timbrature',
    header: 'Timbrature',
    cell: ({ row }) => {
      const ts = row.getValue('timbrature') as Array<{ Ora: string; Verso: number }> | undefined
      return ts && ts.length
        ? ts.map((t) => `${t.Ora}${t.Verso === 0 ? 'E' : 'U'}`).join(' - ')
        : ''
    }
  }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
</script>

<template>
  <div class="flex flex-1">
    <UDashboardPanel
      id="inbox-1"
      resizable
    >
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :columns="columns"
        :data="data"
        :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
      />
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </UDashboardPanel>
  </div>
</template>
