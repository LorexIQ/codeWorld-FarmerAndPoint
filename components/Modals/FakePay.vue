<script setup lang="ts">
import {UseModal} from "~/components/UI/types/modal";

interface Props {
  value: UseModal
}

const props = defineProps<Props>();
</script>

<template>
  <UILModal :props="value">
   <div>
     <div class="loading">
       <nuxt-icon name="check"/>
     </div>
     <div class="success">

     </div>
   </div>
  </UILModal>
</template>

<style lang="scss" scoped></style>
