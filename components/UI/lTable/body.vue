<script setup lang="ts">

</script>

<template>
  <tbody class="table-body">
    <slot/>
  </tbody>
</template>

<style lang="scss" scoped>
.table-body {
  background-color: #f2f2f2;
  &:before {
    content: '';
    display: block;
    height: 10px;
  }
}
</style>
