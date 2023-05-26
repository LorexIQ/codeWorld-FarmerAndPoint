<script setup lang="ts">
interface Props {
  align?: LTableAlign
}
interface Emit {
  (e: 'click', value: MouseEvent): void
}

const emit = defineEmits<Emit>();
const props = defineProps<Props>();
</script>

<template>
  <th class="table-header" :class="align" @click="e => emit('click', e)">
    <slot/>
  </th>
</template>

<style lang="scss" scoped>
.table-header {font-weight: 500;
  position: relative;
  padding: 8px 8px;
  color: var(--MainDarknesColor);
  background-color: #fff;
}

.left {
  text-align: left;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
</style>
