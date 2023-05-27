<script setup lang="ts">
import {UseModal} from "~/components/UI/types/modal";

interface Props {
  value: UseModal
}

const props = defineProps<Props>();
</script>

<template>
  <UILModal :value="value">
    <h2>Оплата через Онлайн Банк</h2>
    <UILHr/>
    <iframe width="600px" height="550px" src="https://fermer-product.server.paykeeper.ru/form"/>
  </UILModal>
</template>

<style lang="scss" scoped>
.l-hr {
  margin: 20px 0;
}
</style>
