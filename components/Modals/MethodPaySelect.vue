<script setup lang="ts">
import {UseModal} from "~/components/UI/types/modal";

interface Props {
  value: UseModal
}
interface Emits {
  (e: 'changeMethod', value: PayMethod): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function selectMethod(method: PayMethod) {
  emit('changeMethod', method);
}
</script>

<template>
  <UILModal :value="value">
    <div class="modal-pay__methods">
      <div class="modal-pay__methods__method" @click="() => selectMethod('LOCAL')">
        <nuxt-icon name="userCard"/>
        <span>Карта профиля</span>
      </div>
      <div class="modal-pay__methods__method" @click="() => selectMethod('BANK')">
        <nuxt-icon name="bank"/>
        <span>Банк Открытие</span>
      </div>
    </div>
  </UILModal>
</template>

<style lang="scss" scoped>
.modal-pay {
  &__methods {
    display: flex;
    gap: 20px;

    &__method {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      text-align: center;
      padding: 30px;
      border-radius: 15px;
      background-color: var(--frame-bg-2);
      box-shadow: 0 0 15px -3px var(--shadow);
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: rgba(0, 0, 0, 0.15);
      }
      & .nuxt-icon {
        font-size: 60px;
      }
    }
  }
}
</style>
