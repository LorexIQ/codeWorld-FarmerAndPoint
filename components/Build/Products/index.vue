<script setup lang="ts">
import {useAuth, useLFetch, useRouter} from "#imports";
import LButton from "~/components/UI/lButton.vue";
import ProductCard from "~/components/Build/Products/ProductCard.vue";

const auth = useAuth();
const router = useRouter();
const user = auth.data as unknown as User;
const products = await useLFetch<Product[]>(`/product/get-products-by-user-id?id=${user.value.id}`);

function createProduct() {
  console.log(1)
  router.push({path: '/products/new'});
}
</script>

<template>
  <div class="products-component">
    <div class="products-component__header">
      <h1>Продукты</h1>
      <l-button @click="createProduct">Добавить</l-button>
    </div>
    <UILHr/>
    <div class="products-component__slider">
      <div class="products-component__slider__list">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :value="product"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-component {
  & .l-hr {
    margin: 20px 0;
  }
  &__header {
    display: flex;
    justify-content: space-between;

    & .l-button {
      width: max-content;
    }
  }
  &__slider {
    overflow-y: auto;
    padding: 5px 5px 15px;
    &__list {
      display: flex;
      gap: 20px;
    }
  }
}
</style>
