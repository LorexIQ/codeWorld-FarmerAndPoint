<script setup lang="ts">
interface Props {
  value: boolean
}
interface Emit {
  (e: 'update:value', value: boolean): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

function changeSwitchStatus() {
  emit('update:value', !props.value);
}
</script>

<template>
  <div
      class="l-switch"
      :class="{'l-switch--active': value}"
      @click="changeSwitchStatus"
  >
    <div class="l-switch__swiper"/>
  </div>
</template>

<style lang="scss" scoped>
$height: 34px;
$innerHeight: 26px;
$padding: calc(($height - $innerHeight) / 2);

.l-switch {
  position: relative;
  width: calc($height * 2 + 2px);
  height: calc($height + 2px);
  padding: $padding;
  border: 1px solid #454444;
  border-radius: calc($height / 2);
  background-color: #2a2a3c;
  cursor: pointer;
  user-select: none;
  transition: .3s;

  &:hover {
    & > div {
      top: $padding;
      box-shadow: 0 0;
    }
  }
  &__swiper {
    position: absolute;
    top: calc($padding - 5px);
    left: $padding;
    width: $innerHeight;
    height: $innerHeight;
    border-radius: 100%;
    background: linear-gradient(124deg, #d0d0d0, #7eb7dc);
    background-size: 400% 400%;
    box-shadow: 0 5px #799eb2;
    animation: wives 9s ease infinite;
    transition: .3s;
  }
  &--active {
    & > div {
      left: calc($padding  + $height);
    }
  }
  @keyframes wives {
    0% { background-position: 0 59% }
    50% { background-position: 100% 42% }
    100% { background-position: 0 59% }
  }
}
</style>
