<script setup lang="ts">
type CheckboxState = boolean | 1 | 0;
interface Props {
  id: Number,
  value: CheckboxState
}
interface Emit {
  (e: 'update:value', state: CheckboxState): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

function changeEventHandler(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  const isNumber = typeof props.value !== 'boolean';

  emit('update:value', (isNumber ? +target.checked : target.checked) as CheckboxState);
}
</script>

<template>
  <div class="checkbox">
    <input
        :id="id"
        type="checkbox"
        :checked="value"
        @change="changeEventHandler"
    >
    <label :for="id">
      <span :style="{'opacity': value ? 1 : 0}"/>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  & input {
    display: none;
  }
  & label {
    display: block;
    width: 100%;
    height: 100%;
    padding: 3px;
    border: 1px solid #454444;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    & span {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      background-color: #497cca;
      opacity: 0;
      transition: .3s;
    }
  }
}
</style>
