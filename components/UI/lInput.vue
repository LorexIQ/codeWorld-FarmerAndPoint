<script setup lang="ts">
import {computed, ref} from "#imports";

interface Props {
  id: string
  type: InputType
  autocomplete?: InputAutocomplete,
  placeholder?: string
  icon?: string
  value?: string
}
interface Emit {
  (e: 'update:value', newValue: string): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

let passwordVisible = ref(false);
let typeComputed = computed(() => {
  return props.type === 'password' ? (passwordVisible.value ? 'text' : 'password') : props.type;
});

function inputEventHandler(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
}
</script>

<template>
  <div class="l-input">
    <input
        :class="{'l-input--icon': icon}"
        :id="`input-${id}`"
        :type="typeComputed"
        :placeholder="placeholder"
        :value="value"
        @input="inputEventHandler"
        :autocomplete="autocomplete ?? 'off'"
    >
    <label
        class="l-input__icon --pass"
        v-if="type === 'password'"
        :for="`input-${id}`"
        @click="passwordVisible = !passwordVisible"
    >
      <nuxt-icon name="eyeOff" v-if="passwordVisible"/>
      <nuxt-icon name="eye" v-else/>
    </label>
    <label
        class="l-input__icon --type"
        v-if="icon"
        :for="`input-${id}`"
    >
      <nuxt-icon :name="icon"/>
    </label>
  </div>
</template>

<style lang="scss">
.nuxt-icon svg {
  margin: 0 !important;
}
</style>

<style lang="scss" scoped>
.l-input {
  position: relative;
  & input {
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    border: 1px solid #454444;
    border-radius: 5px;
    outline: 1px solid transparent;
    color: var(--text) !important;
    background-color: rgba(0, 0, 0, 0.1) !important;
    transition: .3s;

    &::placeholder {
      color: var(--text-ph);
    }
    &:focus {
      outline: 1px solid #497cca;
    }
  }
  &--icon {
    padding-left: 38px !important;
  }
  &__icon {
    position: absolute;
    top: calc(50% - 14px);
    font-size: 20px;
    height: 20px;
    color: #d0d0d0;
    user-select: none;
    &.--pass {
      right: 10px;
      cursor: pointer;
    }
    &.--type {
      left: 10px;
    }
  }
}
</style>
