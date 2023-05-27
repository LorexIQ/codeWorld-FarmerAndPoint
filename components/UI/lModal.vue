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
if (hook) {
  hook.initOpen(openModal);
  hook.initClose(closeModal);
}

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
          <slot/>
        </body>
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
    border-radius: 7px;
    background-color: var(--frame-bg);
    box-shadow: 0 0 15px -5px var(--shadow);
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
