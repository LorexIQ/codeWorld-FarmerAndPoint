<script setup lang="ts">
import {useAuth, useLFetch, useRouter} from "#imports";

const auth = useAuth();
const router = useRouter();
const user = auth.data as unknown as User;
const products = await useLFetch<Product[]>(`/product/get-products-by-user-id?id=${user.value.id}`);

function goToProduct(id: number) {
  router.push({path: `/products/${id}`});
}
</script>

<template>
  <div class="products-component">
    <div class="products-component__header">
      <h1>Продукты</h1>
    </div>
    <UILHr/>
    <div class="products-component__slider">
      <div class="products-component__slider__list">
        <div
            class="products-component__slider__list__product"
            v-for="product in products"
            :key="product.id"
            @click="() => goToProduct(product.id)"
        >
          <div class="products-component__slider__list__product__img"></div>
          <div class="products-component__slider__list__product__title">{{product.name}}</div>
          <div class="products-component__slider__list__product__category">{{product.categoryName}}</div>
          <div class="products-component__slider__list__product__price">{{product.cost}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-component {
  & .l-hr {
    margin: 20px 0;
  }
  &__slider {
    overflow-y: auto;
    padding: 5px 5px 15px;
    &__list {
      display: flex;
      gap: 20px;
      &__product {
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
          padding-bottom: 10px;
          border-radius: 100%;
          background-color: #fff;
        }
        &__title {
          font-size: 22px;
        }
        &__price {
          font-size: 28px;
        }
      }
    }
  }
}
</style>
