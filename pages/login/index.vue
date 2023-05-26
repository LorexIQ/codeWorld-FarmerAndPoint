<script setup lang="ts">
import {definePageMeta} from "#imports";

definePageMeta({
  auth: false,
  layout: 'auth'
});
</script>

<template>
  <div class="page-auth">
    <Auth/>
  </div>
</template>

<style lang="scss" scoped>
</style>
