<script setup lang="ts">
import {ref, useNuxtApp, useRoute, useRouter, watch} from "#imports";

interface Props {
  value: TableCell<any>[],
  name: string
}

const {$event} = useNuxtApp();
const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

let sortDelayId = ref<NodeJS.Timeout>();
let sortState = ref('');

if (route.query.sort && route.query.sort.length) sortState.value = `${route.query.sort}`;

watch(sortState, () => {
  clearTimeout(sortDelayId.value);
  sortDelayId.value = setTimeout(() => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        sort: sortState.value
      }
    });
    setTimeout(() => {
      $event(`table-pag-${props.name}-update`)
    }, 100);
  }, 400);
})

function sortWork(column: TableCell<any>) {
  if (column.sort) {
    if (!sortState.value.length || sortState.value.slice(1) !== column.id) {
      sortState.value = `+${column.id?.toString()}`
    } else {
      const sortMode = sortState.value[0]
      if (sortMode === '+') {
        sortState.value = `-${sortState.value.slice(1)}`
      } else {
        sortState.value = ''
      }
    }
  }
}
</script>

<template>
  <UILTableHead>
    <UILTableRow>
      <UILTableHeader
          :class="{sortable: column.sort, 'hover-on': sortState.slice(1) === column.id}"
          v-for="column in props.value"
          :key="column.id"
          :align="column.align"
          :style="`width: ${column.width ?? (column.type === 'actions' ? '80px' : '')}`"
          :click="() => sortWork(column)"
      >
        {{ column.title }}
        <nuxt-icon
            v-if="column.sort"
            :name="sortState.length && sortState.slice(1) === column.id ?
              sortState[0] === '+' ?
              `sortUp` :
              `sortDown` :
              `sort`"
        />
      </UILTableHeader>
    </UILTableRow>
  </UILTableHead>
</template>

<style lang="scss" scoped>
.sortable {
  cursor: pointer;
  user-select: none;
  transition: .3s;
  & .nuxt-icon {
    margin-left: 3px;
    color: var(--MainHoverDarknesColor);
    opacity: 0;
    transition: .3s;
  }
  &:hover {
    background-color: #fafafa;
    & .nuxt-icon {
      opacity: 1;
    }
  }
}
.hover-on {
  & .nuxt-icon {
    color: var(--MainDarknesColor) !important;
    opacity: 1 !important;
  }
}
</style>
