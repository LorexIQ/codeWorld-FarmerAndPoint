<script setup lang="ts">

</script>

<template>
  <table class="table">
    <slot/>
  </table>
</template>

<style lang="scss" scoped>
.table {
  position: relative;
  width: 100%;
  padding: 20px;
  border-spacing: 0 0;
  border-radius: 10px;
  background-color: #f2f2f2;
}
</style>
