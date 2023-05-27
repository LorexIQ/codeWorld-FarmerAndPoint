<script setup lang="ts">
import {useAuth, useLFetch, useRouter} from "#imports";
import {BasketStatus} from "~/app/entities";

const auth = useAuth();
const user = auth.data as unknown as User;
const router = useRouter();

const baskets = await useLFetch<Basket[]>(`/basket/basket-for-user?id=${user.value.id}`);
const tClosedHeadData: TableCell<Basket>[] = [
  {
    id: null,
    title: '№П/п',
    type: 'increment'
  },
  {
    id: 'id',
    title: 'ID',
    type: 'text'
  },
  {
    id: 'name_subscriptionsBasket',
    title: 'Подписка',
    type: 'text'
  },
  {
    id: 'cost',
    title: 'Стоимость',
    type: 'rPrice'
  },
  {
    id: 'name_statusBasket',
    title: 'Статус',
    type: 'text'
  },
  {
    id: null,
    title: '',
    type: 'actions'
  }
];
const tActiveHeadData: TableCell<Basket>[] = tClosedHeadData.slice(1);

const activeBasket = getActiveBasket();
const closedBaskets = getClosedBaskets();

function getActiveBasket(): Basket | null {
  return baskets.filter(basket => basket.id_statusBasket === BasketStatus.ACTIVE)[0] ?? null;
}
function getClosedBaskets(): Basket[] {
  return baskets.filter(basket => basket.id_statusBasket === BasketStatus.CLOSED);
}

function openBasket(id: number) {
  router.push({path: `/basket/${id}`})
}
</script>

<template>
  <div class="basket-page">
    <h2>Активная</h2>
    <UILHr/>
    <UILTable>
      <UILTableModuleSort :value="tActiveHeadData" name="default"/>
      <UILTableModuleBodyView
          v-if="activeBasket"
          :value="[activeBasket]"
          :columns="tActiveHeadData"
          @rowAction="openBasket"
      />
      <UILTableModuleNullList v-else>
        Добавьте товар. Корзина будет создана автоматически
      </UILTableModuleNullList>
    </UILTable>
    <h2>Оплачено</h2>
    <UILHr/>
    <UILTable>
      <UILTableModuleSort :value="tClosedHeadData" name="default"/>
      <UILTableModuleBodyView
          v-if="closedBaskets.length"
          :value="closedBaskets"
          :columns="tClosedHeadData"
          @rowAction="openBasket"
      />
      <UILTableModuleNullList v-else/>
    </UILTable>
  </div>
</template>

<style lang="scss" scoped>
.l-hr {
  margin: 20px 0;
}
.basket-page {
  & .table-row {
    cursor: pointer;
  }
  &__row {
    display: flex;
    justify-content: space-between;

    & .l-button {
      width: max-content;
    }
  }
}
</style>
