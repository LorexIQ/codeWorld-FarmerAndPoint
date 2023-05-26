<script setup lang="ts">
interface Props {
  type?: ButtonType
  decor?: ButtonStyle,
  disabled?: boolean
}

const props = defineProps<Props>();
</script>

<template>
  <button
      class="l-button"
      :class="{[`--${decor}`]: decor, 'disables': disabled}"
      :type="type ?? 'button'"
  >
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
.l-button {
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  padding: 7px 20px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 0;
  color: #1c1b2e;
  background: linear-gradient(124deg, #d0d0d0, #7eb7dc);
  background-size: 400% 400%;
  box-shadow: 0 5px #799eb2;
  animation: wives 9s ease infinite;
  cursor: pointer;
  user-select: none;
  transition: .3s;

  &:hover {
    box-shadow: 0 0 !important;
    transform: translateY(5px);
  }
  &.disables {
    box-shadow: 0 0;
    transform: translateY(5px);
    pointer-events: none;
  }
  &.--green {
    animation: greenAnimate 1s linear infinite;
    background-image: linear-gradient(0deg,#72d166,#a0c78f,#72d166,#a0c78f);
    background-size: 100% 300%;
    box-shadow: 0 5px #579b64;
  }
  &.--red {
    animation: redAnimate 1s linear infinite;
    background-image: linear-gradient(0deg,#d36b64,#cb5757,#d36b64,#cb5757);
    background-size: 100% 300%;
    box-shadow: 0 5px #8b4b4b;
    color: #d0d0d0;
    text-shadow: 0 2px #565050;
  }

  @keyframes greenAnimate {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }
  @keyframes redAnimate {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }
  @keyframes wives {
    0% { background-position: 0 59% }
    50% { background-position: 100% 42% }
    100% { background-position: 0 59% }
  }
}
</style>
