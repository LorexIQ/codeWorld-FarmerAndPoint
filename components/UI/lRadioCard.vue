<script setup lang="ts">
interface Props {
  id: string,
  namespace: string,
  name: string,
  icon: string,
  checked?: boolean,
  value: string
}
interface Emits {
  (e: 'update:value', value: string): void
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

function changeRadioState(event: Event) {
  const DOMElement = event.target as HTMLInputElement;
  emit('update:value', DOMElement.id);
}
</script>

<template>
  <div class="l-radio-card">
    <input
        class="l-radio-card__input"
        type="radio"
        :id="id"
        :name="namespace"
        :checked="checked"
        @change="changeRadioState"
    >
    <label :for="id">
      <span class="l-radio-card__icon">
        <nuxt-icon :name="icon"/>
      </span>
      <span class="l-radio-card__name">
        <span>{{name}}</span>
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.l-radio-card {
  width: 100%;
  &__input {
    display: none;
    &:checked {
      &+label {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  & label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 5px;
    cursor: pointer;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  & .nuxt-icon {
    font-size: 40px;
  }
}
</style>
