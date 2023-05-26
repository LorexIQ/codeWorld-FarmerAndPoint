<script setup lang="ts">
import LInput from '~/components/UI/lInput.vue';
import {watch} from "#imports";
import {ref} from "@vue/reactivity";
import {InputActivator, UseSmartInputExtendedReturn, UseSmartInputReturn} from "~/components/Smart/Input/types/entities";

interface Props {
  id: string
  value: UseSmartInputReturn

  type: 'text' | 'password'
  icon?: string
}
const props = defineProps<Props>();

const hook = props.value as UseSmartInputExtendedReturn;
const store = hook.value;
const regex = hook.regex;
const attrs = hook.attrs;
let writableValue = ref(store.value);
let error = ref('');
let status = ref(hook.status);
let inputDOM = ref<HTMLInputElement>();

watch(writableValue, () => {
  if (error.value) {
    error.value = '';
    hook.status.value = InputActivator.UNCHECK;
  }
});

hook.validateFunc(() => {
  inputDOM.value?.classList.remove('smart-input--error');
  if (regex.pattern.test(writableValue.value)) {
    store.value = writableValue.value;
    return true;
  } else {
    error.value = regex.error;
    setTimeout(() => inputDOM.value?.classList.add('smart-input--error'));
    return false;
  }
});
</script>

<template>
  <div class="smart-input">
    <div
        class="smart-input__input"
        ref="inputDOM"
    >
      <l-input
          :id="id"
          :type="type"
          :icon="icon"
          v-model:value="writableValue"
          v-bind="attrs"
      />
    </div>
    <label>
      <span v-if="error">{{ error }}</span>
    </label>
  </div>
</template>

<style lang="scss">
.smart-input {
  &--error {
    & input {
      outline: 1px solid #ae5353 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.smart-input {
  &--error {
    animation-name: shake;
    animation-duration: .15s;
    animation-iteration-count: 2;
  }
  & label {
    & * {
      transition: .3s;
      overflow: hidden;
    }
    & span {
      display: block;
      line-height: 18px;
      font-weight: 500;
      padding: 5px 0;
      color: #ae5353;
    }
  }
}

@keyframes shake {
  0% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(-2px);
  }
}
</style>
