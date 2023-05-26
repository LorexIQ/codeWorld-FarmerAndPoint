<script setup lang="ts">
import {useLFetch} from "#imports";

const products = await useLFetch('/all-products');
</script>

<template>
  <div class="page-products">

  </div>
</template>

<style lang="scss" scoped></style>
