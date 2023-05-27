<script setup lang="ts">
import {useAuth, useLFetch, useRouter} from "#imports";
import {useSmartButton} from "~/components/Smart/Button/composables";

interface Props {
  value: Product,
  add?: boolean
}

const router = useRouter();
const props = defineProps<Props>();

const addBtn = useSmartButton();
const auth = useAuth();
let user = auth.data as unknown as User;

function goToProduct(id: number) {
  router.push({path: `/products`});
}
async function addProductToBasket() {
  if (!user.value.id_basket) {
    await useLFetch(`/basket/create-basket`, {
      method: 'POST',
      body: {
        id_user: user.value.id,
        id_statusBasket: 1,
        id_subscriptionsBasket: 1
      }
    });
    user = await auth.getSession() as User;
  }
  await addBtn.fetch(useLFetch(`/basket/create-order`, {
    method: 'POST',
    body: {
      id_basket: user.value.id_basket,
      id_product: props.value.id
    }
  }))
}
</script>

<template>
  <div
      class="product"
      @click="() => goToProduct(value.id)"
  >
    <div class="product__img"><nuxt-icon name="box"/></div>
    <div class="product__title">{{value.name}}</div>
    <div class="product__category">{{value.categoryName}}</div>
    <div class="product__price">{{value.cost}} ₽</div>
    <div class="product__btn" v-if="add"><SmartButton :value="addBtn" @click="addProductToBasket">
      <template #default>Добавить</template>
      <template #loading>Добавление</template>
    </SmartButton></div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  height: 330px;
  padding: 15px 0;
  border-radius: 10px;
  background-color: var(--frame-bg-2);
  box-shadow: 0 0 10px -3px var(--border);
  cursor: pointer;

  &__img {
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 170px;
    margin-bottom: 20px;
    border-radius: 10%;
    background-color: #fff;
    box-shadow: 0 0 15px -5px var(--shadow);
  }
  &__title {
    font-size: 22px;
    font-weight: 600;
  }
  &__price {
    font-size: 28px;
    font-weight: 700;
  }
}
</style>
