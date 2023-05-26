<script setup lang="ts">
import useLFetch from "~/composables/useLFetch";

const testData = await useLFetch<User[]>('user/get-user-by-role?role=USER');

const tHeadData: TableCell<User>[] = [
  {
    id: null,
    title: '№ п/п',
    type: 'increment',
    width: '170px'
  },
  {
    id: 'name',
    title: 'Фио',
    type: 'text',
    align: 'left',
    sort: true,
    filter: true
  },
  {
    id: 'login',
    title: 'Логин',
    type: 'text',
    sort: true,
    filter: true
  },
  {
    id: null,
    title: '',
    type: 'actions'
  }
];
</script>

<template>
  <div class="page-users">
    <UILTable>
      <UILTableModuleSort v-model:value="tHeadData" name="default"/>
      <UILTableBody>
        <UILTableRow
          v-for="(row, index) in testData"
          :key="row.id"
        >
          <UILTableData
            v-for="col in tHeadData"
            :key="`cell-${row.id}-${col.id}`"
            :align="col.align"
          >
            <template v-if="col.type === 'increment'">
              {{index + 1}}
            </template>
            <template v-else-if="col.type === 'text'">
              {{row[col.id]}}
            </template>
            <template v-else-if="col.type === 'actions'">
              <div class="row-action">
                <nuxt-icon name="edit"/>
                <nuxt-icon name="delete"/>
              </div>
            </template>
          </UILTableData>
        </UILTableRow>
      </UILTableBody>
    </UILTable>
  </div>
</template>

<style lang="scss" scoped>
.row-action {
  font-size: 25px;
  display: flex;
  gap: 5px;
}
</style>
