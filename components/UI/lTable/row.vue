<script setup lang="ts">
interface Props {
  hoverEffect?: boolean
}

const props = defineProps<Props>();
</script>

<template>
  <tr class="table-row" :class="{'table-row--hover': props?.hoverEffect}">
    <slot/>
  </tr>
</template>

<style lang="scss" >
.table-row {
  position: relative;
  height: 37px;
  &:not(&:last-child) {
    &:after {
      content: ' ';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  & .table-header {
    &:not(&:last-child) {
      &:after {
        content: ' ';
        position: absolute;
        top: 5px;
        right: 0;
        width: 1px;
        height: calc(100% - 10px);
        border-radius: 1px;
        background-color: #e2e2e2;
      }
    }
  }
  &:first-child {
    & .table-header, & .table-data {
      &:first-child {
        border-top-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
      }
    }
  }
  &:last-of-type {
    & .table-header, & .table-data {
      &:first-child {
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-bottom-right-radius: 5px;
      }
    }
  }
  &--hover {
    cursor: pointer;
    &:hover {
      & .table-data {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>
