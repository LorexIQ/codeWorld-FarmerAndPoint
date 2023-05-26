<script setup lang="ts">
import {useAuth, useLFetch, useRoute} from "#imports";
import {useParams} from "next/navigation";

const auth = useAuth();
const user = auth.data as unknown as User;
const params = useRoute().params;
console.log(params)

const orders = await useLFetch(`/basket/orders-for-basket?id=${params.id}`);
const tHeadData: TableCell<Order>[] = [
  {
    id: null,
    title: '№П/п',
    type: 'increment'
  },
  {
    id: 'name_product',
    title: 'Продукт',
    type: 'text'
  },
  {
    id: 'id_basket',
    title: 'Корзина',
    type: 'text'
  }
]
</script>

<template>
  <div class="basket-page">
    <div class="basket-page__row">
      <h2>Заказы корзины №{{params.id}}</h2>
    </div>
    <UILHr/>
    <UILTable>
      <UILTableModuleSort v-model:value="tHeadData" name="default"/>
      <UILTableBody>
        <UILTableRow
            v-for="(row, index) in orders"
            :key="row.id"
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

<style lang="scss" scoped></style>
