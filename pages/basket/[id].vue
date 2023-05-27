<script setup lang="ts">
import {useAuth, useLFetch, useRoute, useRouter} from "#imports";
import LButton from "~/components/UI/lButton.vue";
import useModal from "~/components/UI/composables/useModal";
import {BasketStatus} from "~/app/entities";

const auth = useAuth();
const user = auth.data as unknown as User;
const params = useRoute().params;
const router = useRouter();

const payModal = useModal();
const bankModal = useModal();
const test = useModal();

const basket = await useLFetch<Basket>(`/basket/get-basket-by-id?id=${params.id}`);
const orders = await useLFetch<Order[]>(`/basket/orders-for-basket?id=${params.id}`);
const tHeadData: TableCell<Order>[] = [
  {
    id: null,
    title: '№П/п',
    type: 'increment'
  },
  {
    id: 'name_product',
    title: 'Наименование',
    type: 'text'
  },
  {
    id: 'delivery_date',
    title: 'Дата производства',
    type: 'date'
  },
  {
    id: 'delivery_date',
    title: 'Приблизительная дата доставки',
    type: 'date'
  },
  {
    id: 'cost',
    title: 'Стоимость',
    type: 'rPrice'
  }
];

function payBasket() {
  payModal.open();
}
function methodSelected(method: PayMethod) {
  if (method === 'LOCAL') {
    payModal.close();
    useLFetch(`/basket/close-basket?id=${basket.id}`).then(r => router.push({path: '/basket/'}));
    auth.getSession();
  } else if (method === 'BANK') {
    payModal.close();
    bankModal.open();
  }
}
</script>

<template>
  <div class="basket-page">
    <div class="basket-page__check">
      <h2>Товары корзины №{{params.id}} ({{basket.name_statusBasket}})</h2>
      <UILHr/>
      <UILTable>
        <UILTableModuleSort v-model:value="tHeadData" name="default"/>
        <UILTableModuleBodyView :value="orders" :columns="tHeadData"/>
      </UILTable>
    </div>
    <div class="basket-page__result">
      <UILHr/>
      <div class="basket-page__result__content">
        <div class="basket-page__result__content__price">
          <span>Итого:</span>
          <h2>{{basket.cost}} ₽</h2>
        </div>
        <l-button v-if="basket.id_statusBasket === BasketStatus.ACTIVE" @click="payBasket">Оплатить</l-button>
        <h2 v-else>Оплачено</h2>
      </div>
    </div>
    <ModalsMethodPaySelect :value="payModal" @changeMethod="methodSelected"/>
    <ModalsBankPay :value="bankModal"/>
  </div>
</template>

<style lang="scss" scoped>
.l-hr {
  margin: 20px 0;
}
.basket-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__check {}
  &__result {
    &__content {
      display: flex;
      justify-content: space-between;

      & span {
        font-size: 30px;
      }
      & h2 {
        font-size: 30px;
        white-space: nowrap;
      }
      &__price {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      & .l-button {
        font-size: 26px;
        width: min-content;
      }
    }
  }
}
</style>
