<script setup lang="ts">
interface Props {
  value: number
}

const props = defineProps<Props>();
const starts = [0, 0, 0, 0, 0];
</script>

<template>
  <div class="stars">
    <nuxt-icon
        name="star"
        :class="{'start--active': value > index}"
        v-for="(start, index) in starts"
        :key="index"
    />
  </div>
</template>

<style lang="scss" scoped>
.stars {
  font-size: 40px;
  &--active {
    & svg path {
      color: #76be81 !important;
    }
  }
}
</style>
