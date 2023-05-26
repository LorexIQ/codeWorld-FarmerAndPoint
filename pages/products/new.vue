<script setup lang="ts">
import {useSmartInputs} from "~/components/Smart/Input/composables";
import {ref, useAuth, useLFetch, useRouter} from "#imports";
import Categories from "~/components/Build/Categories.vue";
import {useSmartButton} from "~/components/Smart/Button/composables";

let loadedImage = ref('');
const inputs = useSmartInputs({
  name: {
    regex: {
      pattern: new RegExp('^.{5,}$'),
      error: 'Наименование слишком короткое'
    },
    attrs: {
      placeholder: 'Наименование'
    }
  },
  description: {
    regex: {
      pattern: new RegExp('^.{5,}$'),
      error: 'Описание слишком короткое'
    },
    attrs: {
      placeholder: 'Описание'
    }
  },
  cost: {
    regex: {
      pattern: new RegExp('^[1-9]+$'),
      error: 'Стоимость должна быть больше нуля'
    },
    attrs: {
      placeholder: 'Стоимость'
    }
  },
});
const createButton = useSmartButton();
let selectedCategory = ref(2);
const router = useRouter();

const auth = useAuth();
const user = auth.data as unknown as User;

async function createProduct() {
  if (inputs.check()) {
    createButton.fetch(useLFetch('/product/add-product', {
      method: 'POST',
      body: {
        ...inputs.values,
        id_user: user.value.id,
        id_category: selectedCategory.value,
        photo: loadedImage.value
      }
    })).then((res: any) => router.push({path: `/products`}));
  }
}
</script>

<template>
  <div class="product-new">
    <Categories v-model:value="selectedCategory"/>
    <div class="product-new__creation">
      <l-avatar v-model:value="loadedImage"/>
      <SmartInput
          id="products-new-name"
          type="text"
          icon="email"
          :value="inputs.store.name"
      />
      <SmartInput
          id="products-new-description"
          type="text"
          icon="description"
          :value="inputs.store.description"
      />
      <SmartInput
          id="products-new-cost"
          type="text"
          icon="price"
          :value="inputs.store.cost"
      />
      <SmartButton :value="createButton" @click="createProduct">
        <template #default>Создать</template>
        <template #loading>Загрузка</template>
      </SmartButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.l-hr {
  margin: 20px 0;
}
.product-new {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  &__creation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 40%;
    height: calc(100% + 60px);
    padding: 30px;
    margin: -30px -30px -30px 0;
    background-color: var(--frame-bg-2);
    box-shadow: 0 0 10px -3px var(--border);

    & .avatar {
      margin: 40px 0;
    }
    & .smart-input {
      width: 90%;
    }
  }
}
</style>
