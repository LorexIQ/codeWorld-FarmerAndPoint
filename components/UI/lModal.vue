<script setup lang="ts">
import {OnClickOutside} from "@vueuse/components";
import {ref} from "#imports";
import {UseModal, UseModalExtended} from "~/components/UI/types/modal";
import LButton from "~/components/UI/lButton.vue";
import LHr from "~/components/UI/lHr.vue";

interface Props {
  value: UseModal,
  defaultStatus?: boolean
}

const props = defineProps<Props>();
const hook = props.value as UseModalExtended;

let status = ref(props.defaultStatus ?? false);
hook.initOpen(openModal);
hook.initClose(closeModal);

function openModal() {
  status.value = true;
}
function closeModal() {
  status.value = false;
}
</script>

<template>
  <Transition name="fade">
    <div class="modal" v-if="status">
      <OnClickOutside class="modal__content" @trigger="closeModal">
        <body>
          <slot name="body"/>
        </body>
        <l-hr/>
        <footer>
          <slot name="footer"/>
          <l-button decor="red" @click="closeModal">Закрыть</l-button>
        </footer>
      </OnClickOutside>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  &__content {
    width: min-content;
    padding: 20px;
    border: 1px solid #454444;
    border-radius: 7px;
    background-color: #2f2f43;
    & .l-hr {
      margin: 20px 0 !important;
    }
    & footer {
      display: flex;
      gap: 10px;
      margin: 0 0 0 auto;
      width: min-content;
    }
  }
}
</style>
