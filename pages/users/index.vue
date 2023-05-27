<script setup lang="ts">
import useLFetch from "~/composables/useLFetch";

const users = await useLFetch<User[]>('user/get-user-by-role');

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
    <h2>Пользователи</h2>
    <UILHr/>
    <UILTable>
      <UILTableModuleSort v-model:value="tHeadData" name="default"/>
      <UILTableModuleBodyView :value="users" :columns="tHeadData"/>
    </UILTable>
  </div>
</template>

<style lang="scss" scoped>
.l-th {
  margin: 20px 0;
}
.row-action {
  font-size: 25px;
  display: flex;
  gap: 5px;
}
</style>
