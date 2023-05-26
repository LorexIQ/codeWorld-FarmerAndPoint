<script setup lang="ts">
interface Props {
  value: number
}

const props = defineProps<Props>();
</script>

<template>
  <div class="stars">
    <h4>{{value}}/5</h4>
    <div class="starts__svg">
      <nuxt-icon
          name="star"
          v-for="(start, index) in Array(value)"
          :key="index"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stars {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 40px;

  &__svg {
    & svg {
      color: #76be81 !important;
    }
  }
}
</style>
