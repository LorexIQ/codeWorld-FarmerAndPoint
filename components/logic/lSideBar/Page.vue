<script setup lang="ts">
interface Props {
  value: Page
}

const props = defineProps<Props>();
const page = props.value;
</script>

<template>
  <div class="page" v-if="value.if ? value.if() : true">
    <NuxtLink :to="page.link" class="page__self">
      <div class="page__self__icon"><nuxt-icon :name="page.icon"/></div>
      <div class="page__self__name">{{page.title}}</div>
    </NuxtLink>
    <div class="page__children" v-if="page.children">
      <Page
        v-for="childPage in page.children"
        :key="childPage.link"
        :value="childPage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  &__self {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px;
    border-radius: 20px;
    color: #1c1b2e;
    background-color: rgba(255, 255, 255, 0.15);
    cursor: pointer;
    text-decoration: none;
    transition: .3s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
    & .nuxt-icon {
      font-size: 35px;
    }
    &__name {
      font-size: 30px;
    }
  }
  &__children {
    margin-left: 30px;
  }
}
</style>
