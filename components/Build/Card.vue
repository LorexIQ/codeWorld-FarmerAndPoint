<script setup lang="ts">
import {useSmartButton} from "~/components/Smart/Button/composables";
import {useSmartInputs} from "~/components/Smart/Input/composables";
import {reactive, ref, useAuth, useLFetch, useUtils} from "#imports";

const {parseCardData} = useUtils();
const auth = useAuth();
const user = auth.data as unknown as User;
let isHasCard = ref(user.value.card !== null);
let card = reactive<Card>(user.value.card ? parseCardData(user.value.card) : {
  number: '',
  date: '',
  cvv: '',
  new: true
});

const cardDeleteBtn = useSmartButton();
const cardCreateBtn = useSmartButton();
const cardInputs = useSmartInputs({
  number: {
    regex: {
      pattern: new RegExp('^[0-9]{16}$'),
      error: 'Неверный формат банковской карты'
    },
    attrs: {
      placeholder: 'Номер карты'
    }
  },
  date: {
    regex: {
      pattern: new RegExp('^(0[1-9]|1[0-2])\\/?([0-9]{2})$'),
      error: 'Неверный формат срока действия'
    },
    attrs: {
      placeholder: 'MM/YY'
    }
  },
  cvv: {
    regex: {
      pattern: new RegExp('^[0-9]{3}$'),
      error: 'Неверный формат CVV'
    },
    attrs: {
      placeholder: "CVV"

    }
  },
});

function initCard() {
  isHasCard.value = true;
}
function closeCreateCard() {
  isHasCard.value = false;
}
async function createCard() {
  const inputs = cardInputs.values;

  if (cardInputs.check()) {
    cardCreateBtn.fetch(useLFetch('/user/update-card', {
      method: 'POST',
      body: {
        id: user.value.id,
        card: `${inputs.number}|${inputs.date}|${inputs.cvv}`
      }
    }))
        .then(async res => {
          card.new = false;
          await auth.getSession();
          cardCreateBtn.dropStatus();
        })
  } else {
    cardCreateBtn.dropStatus();
  }
}
async function deleteCard() {
  cardDeleteBtn.fetch(useLFetch('/user/update-card', {
    method: 'POST',
    body: {
      id: user.value.id,
      card: null
    }
  }))
      .then(res => {
        isHasCard.value = false;
        user.value.card = null;
        auth.getSession();
        cardDeleteBtn.dropStatus();
      })
      .catch(err => err)
}
</script>

<template>
  <div class="cards-component">
    <div class="cards-component__header">
      <h1>Карты</h1>
    </div>
    <UILHr/>
    <div class="cards-component__cards">
      <div v-if="user.card && !card?.new" class="cards-component__cards__card --view">
        <h2>Карта</h2>
        <span>{{card.number}}</span>
        <div class="cards-component__cards__card__row">
          <span>{{card.date}}</span>
          <span>***</span>
        </div>
        <SmartButton :value="cardDeleteBtn" @click="deleteCard">
          <template #loading>Удаление</template>
          <template #default>Удалить</template>
        </SmartButton>
      </div>
      <form @submit.prevent="createCard" v-else-if="isHasCard" class="cards-component__cards__card --create">
        <h2>NEW CARD</h2>
        <div class="cards-component__cards__card__close" @click="closeCreateCard">
          <nuxt-icon name="dismiss"/>
        </div>
        <SmartInput
            id="auth-number"
            type="text"
            icon="userCard"
            :value="cardInputs.store.number"
        />
        <div class="cards-component__cards__card__row">
          <SmartInput
              id="auth-date"
              type="text"
              icon="userCard"
              :value="cardInputs.store.date"
          />
          <SmartInput
              id="auth-cvv"
              type="text"
              icon="userCard"
              :value="cardInputs.store.cvv"
          />
        </div>
        <SmartButton type="submit" :value="cardCreateBtn">
          <template #default>Создать</template>
          <template #loading>Создание</template>
        </SmartButton>
      </form>
      <div v-else class="cards-component__cards__card --add" @click="initCard">
        <nuxt-icon name="plus"/>
      </div>
    </div>
    <UILHr/>
  </div>
</template>

<style lang="scss" scoped>
.cards-component {
  & .l-hr {
    margin: 20px 0;
  }
  &__cards {
    &__card {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 250px;
      width: 400px;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--frame-bg-2);
      box-shadow: 0 0 10px -3px var(--border);

      & span {
        font-size: 24px;
      }
      &__close {
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
      & .smart-input {
        width: 100%;
      }
      &__row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }
      &.--view {
        & .smart-button {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
      &.--create {
      }
      &.--add {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        & .nuxt-icon {
          font-size: 90px;
        }
      }
    }
  }
}
</style>
