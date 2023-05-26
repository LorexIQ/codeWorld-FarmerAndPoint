<script setup lang="ts">
interface Props {
  to: string
}
const props = defineProps<Props>();
</script>

<template>
  <NuxtLink v-bind="props"><slot/></NuxtLink>
</template>

<style lang="scss" scoped>
a {
  font-size: 12px;
  padding: 10px 0 0;
  color: #d0d0d0;
  text-decoration: none;
}
</style>
