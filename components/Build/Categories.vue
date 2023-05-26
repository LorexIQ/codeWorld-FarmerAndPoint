<script setup lang="ts">
import {ref, useLFetch} from "#imports";

interface Props {
  value: number
}
interface Emits {
  (e: 'update:value', value: number): void
}

const categories = await useLFetch<Category[]>('/other/all-category');

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function selectCategory(id: number) {
  emit('update:value', id);
}
</script>

<template>
  <div class="categories">
    <h2>Кагегории</h2>
    <UILHr/>
    <div
        class="categories__category"
        :class="{'--selected': value === category.id}"
        v-for="category in categories"
        :key="category.id"
        @click="() => selectCategory(category.id)"
    >
      {{category.name}}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categories {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: max-content;
  &__category {
    font-size: 24px;
    width: max-content;
    padding: 7px 15px;
    border-radius: 5px;
    border: 1px solid var(--border);
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
    &.--selected {
      color: var(--frame-bg-2);
      background-color: var(--text);
    }
  }
}
</style>
