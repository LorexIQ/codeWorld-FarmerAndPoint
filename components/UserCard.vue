<script setup lang="ts">
import LButton from "~/components/UI/lButton.vue";

interface Props {
  client: string,
  button?: boolean,
  decor?: 'online'
}
interface Emit {
  (e: 'click', value: string): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
</script>

<template>
  <div class="user">
    <div class="user__img" :class="`--${decor}`">
      <nuxt-icon name="user"/>
    </div>
    <div class="user__title">
      {{client}}
    </div>
    <div class="user__message" v-if="button">
      <slot name="button">
        <l-button @click="emit('click', client)"><nuxt-icon name="message"/></l-button>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 10px;
  border: 1px solid #454444;
  border-radius: 7px;
  background-color: #2a2a3c;

  &__img {
    font-size: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    color: #d0d0d0;
    background-color: #575e78;

    &.--online {
      color: #1c1b2e;
      background-color: #76be81;
    }
  }
  &__title {
    font-weight: 500;
    color: #d0d0d0;
    white-space: nowrap;
    overflow: hidden;
  }
  &__message {
    & .l-button {
      font-size: 20px;
      padding: 3px 15px;
    }
  }
}
</style>
