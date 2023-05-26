<script setup lang="ts">
import {useAuth, useLFetch, useRouter} from "#imports";
import LButton from "~/components/UI/lButton.vue";

const auth = useAuth();
const user = auth.data as unknown as User;
const router = useRouter();

const baskets = await useLFetch(`/basket/basket-for-user?id=${user.value.id}`);
const tHeadData: TableCell<Basket>[] = [
  {
    id: null,
    title: '№П/п',
    type: 'increment'
  },
  {
    id: 'name_user',
    title: 'Пользователь',
    type: 'text'
  },
  {
    id: 'name_subscriptionsBasket',
    title: 'Подписка',
    type: 'text'
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
]

function openBasket(id: number) {
  router.push({path: `/basket/${id}`})
}
</script>

<template>
  <div class="basket-page">
    <div class="basket-page__row">
      <h2>Корзины</h2>
      <l-button>Создать</l-button>
    </div>
    <UILHr/>
    <UILTable>
      <UILTableModuleSort v-model:value="tHeadData" name="default"/>
      <UILTableBody>
        <UILTableRow
            v-for="(row, index) in baskets"
            :key="row.id"
            @click="() => openBasket(row.id)"
        >
          <UILTableData
              v-for="col in tHeadData"
              :key="`cell-${row.id}-${col.id}`"
              :align="col.align"
          >
            <template v-if="col.type === 'increment'">
              {{index + 1}}
            </template>
            <template v-else-if="col.type === 'text'">
              {{row[col.id]}}
            </template>
            <template v-else-if="col.type === 'actions'">
              <div class="row-action">
                <nuxt-icon name="link"/>
              </div>
            </template>
          </UILTableData>
        </UILTableRow>
      </UILTableBody>
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
