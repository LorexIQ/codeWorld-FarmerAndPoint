<script setup lang="ts">
import LButton from "~/components/UI/lButton.vue";
import {ButtonFetchStatus, UseSmartButtonResult} from "~/components/Smart/Button/types/entities";

interface Props {
  value: UseSmartButtonResult
  type?: ButtonType
}
const props = defineProps<Props>();
const hook = props.value;
</script>

<template>
  <div
      class="smart-button"
      :class="{
        '--loading': hook.status.value === ButtonFetchStatus.LOADING,
        '--error': hook.status.value === ButtonFetchStatus.ERROR,
        '--success': hook.status.value === ButtonFetchStatus.SUCCESS
      }"
  >
    <l-button :type="type ?? 'button'">
      <slot name="loading" v-if="hook.status.value === ButtonFetchStatus.LOADING"/>
      <slot v-else/>
    </l-button>
  </div>
</template>

<style lang="scss" scoped>
.smart-button {
  &.--loading {
    & button {
      animation: loadingAnimate 0.5s linear infinite;
      background-image: linear-gradient(90deg,#d0d0d0,#8bd364,#d0d0d0,#8bd364);
      background-size: 300% 100%;
      box-shadow: 0 0;
      transform: translateY(5px);
      pointer-events: none;
    }
  }
  &.--success {
    & button {
      animation: successAnimate 1s linear infinite;
      background-image: linear-gradient(0deg,#72d166,#a0c78f,#72d166,#a0c78f);
      background-size: 100% 300%;
      box-shadow: 0 2px #76be81;
      transform: translateY(5px);
      pointer-events: none;
    }
  }
  &.--error {
    & button {
      animation: errorAnimate 1s linear infinite;
      background-image: linear-gradient(0deg,#d36b64,#cb5757,#d36b64,#cb5757);
      background-size: 100% 300%;
      box-shadow: 0 5px #8b4b4b;
    }
  }
}

@keyframes successAnimate {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}
@keyframes loadingAnimate {
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
}
@keyframes errorAnimate {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}
</style>
