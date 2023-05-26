<script setup lang="ts">
import {useRoute} from "#imports";

const route = useRoute();
</script>

<template>
  <div class="default-layout" :class="{'default-layout--disabled': route.path === '/'}">
    <logic-l-side-bar/>
    <div class="default-layout__right">
      <div class="default-layout__right__content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: grid;
  justify-content: center;
  grid-template-columns: 350px calc(100% - 350px);
  grid-template-rows: auto;
  height: 100%;
  width: 100%;
  transition: .3s;

  & .side-bar {
  }
  & .nav-bar {
    height: max-content;
  }
  &__right {
    height: calc(100% - 70px);
    margin: 35px;
    border-radius: 30px;
    box-shadow: 0 0 20px -5px var(--shadow);
    background: var(--frame-bg);
    overflow: hidden;

    &__content {
      height: 100%;
      padding: 30px;
    }
  }
  &--disabled {
    grid-template-columns: 350px 0;
    & .side-bar {
      padding-left: 0;
    }
  }
}
</style>

