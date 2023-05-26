<script setup lang="ts">
import {useRouter} from "#imports";

interface Props {
  value: Product
}

const router = useRouter();
const props = defineProps<Props>();

function goToProduct(id: number) {
  router.push({path: `/products`});
}
</script>

<template>
  <div
      class="product"
      @click="() => goToProduct(value.id)"
  >
    <div class="product__img"><img src="" alt=""></div>
    <div class="product__title">{{value.name}}</div>
    <div class="product__category">{{value.categoryName}}</div>
    <div class="product__price">{{value.cost}}</div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  height: 300px;
  padding: 20px 0;
  border-radius: 10px;
  background-color: var(--frame-bg-2);
  box-shadow: 0 0 10px -3px var(--border);
  cursor: pointer;

  &__img {
    width: 170px;
    height: 170px;
    margin-bottom: 20px;
    border-radius: 100%;
    background-color: #fff;
    box-shadow: 0 0 15px -5px var(--shadow);
  }
  &__title {
    font-size: 22px;
  }
  &__price {
    font-size: 28px;
  }
}
</style>
