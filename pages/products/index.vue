<script setup lang="ts">
import {ref, useAuth, useLFetch, useRouter} from "#imports";
import ProductCard from "~/components/Build/Products/ProductCard.vue";
import LButton from "~/components/UI/lButton.vue";

const products = await useLFetch<Product[]>('/product/all-products');
const users = await useLFetch<User[]>('/user/get-user-by-role');
const categories = await useLFetch<Category[]>('/other/all-category');

let selectedCategory = ref(2);
const router = useRouter();

const auth = useAuth();
const user = auth.data as unknown as User;

function getUserProducts(idUser: number): Product[] {
  return products.filter(product => product.id_user === idUser);
}
function getCategoryProducts(idCategory: number): Product[] {
  if (idCategory === 2) return products;
  return products.filter(product => product.id_category === idCategory);
}
function selectCategory(id: number) {
  selectedCategory.value = id;
}
function createProduct() {
  router.push({path: '/products/new'});
}
</script>

<template>
  <div class="page-products">
    <h2>Категории</h2>
    <UILHr/>
    <div class="page-products__categories">
      <div class="page-products__categories__container">
        <div
            class="page-products__categories__container__category"
            :class="{'--selected': selectedCategory === category.id}"
            @click="() => selectCategory(category.id)"
            v-for="category in categories"
            :key="category.id"
        >
          {{category.name}}
        </div>
      </div>
    </div>
    <UILHr/>
    <div class="page-products__row">
      <h2>Продукты</h2>
      <l-button v-if="user.role === 'FARMER'" @click="createProduct">Добавить</l-button>
    </div>
    <UILHr/>
    <div class="page-products__container">
      <div class="page-products__container__products">
        <ProductCard
            v-for="product in (selectedCategory ? getCategoryProducts(selectedCategory) : products)"
            :key="product.id"
            :value="product"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.l-hr {
  margin: 20px 0;
}
.page-products {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__categories {
    max-height: 100%;

    &__container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      height: max-content;

      &__category {
        font-size: 24px;
        width: max-content;
        padding: 7px 15px;
        border-radius: 5px;
        border: 1px solid var(--border);
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }

        &.--selected {
          color: var(--frame-bg-2);
          background-color: var(--text);
        }
      }
    }
  }
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .l-button {
      width: min-content;
    ;
    }
  }
  &__container {
    overflow: auto;
    padding: 20px;

    &__products {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
}
</style>
