<script setup lang="ts">
interface Props {
  align?: LTableAlign
}

const props = defineProps<Props>();
</script>

<template>
  <td class="table-data" :class="align">
    <slot/>
  </td>
</template>

<style lang="scss" scoped>
.table-data {
  padding: 8px 8px;
  color: var(--MainDarknesColor);
  background-color: #fff;
  transition: .3s;
  text-align: center;
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
