<script setup lang="ts">
import {useRouter, useUtils} from "#imports";

interface Props<T = any> {
  value: T[],
  columns: TableCell<T>[]
}
interface Emits {
  (e: 'rowAction', value: number): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();
const {formatDate} = useUtils();

function rowAction(id: number) {
  emit('rowAction', id);
}
</script>

<template>
  <UILTableBody>
    <UILTableRow
        v-for="(row, index) in value"
        :key="row.id"
        @click="() => rowAction(row.id)"
        :hover-effect="true"
    >
      <UILTableData
          v-for="col in columns"
          :key="`cell-${row.id}-${col.id}`"
          :align="col.align"
      >
        <template v-if="col.type === 'increment'">
          {{index + 1}}
        </template>
        <template v-else-if="col.type === 'text'">
          {{row[col.id]}}
        </template>
        <template v-else-if="col.type === 'rPrice'">
          {{row[col.id]}} ₽
        </template>
        <template v-else-if="col.type === 'date'">
          {{formatDate(row[col.id])}}
        </template>
        <template v-else-if="col.type === 'actions'">
          <div class="row-action">
            <nuxt-icon name="link"/>
          </div>
        </template>
      </UILTableData>
    </UILTableRow>
  </UILTableBody>
</template>

<style lang="scss" scoped></style>
