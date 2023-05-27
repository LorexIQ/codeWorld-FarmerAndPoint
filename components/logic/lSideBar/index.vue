<script setup lang="ts">
import {useAuth} from "#imports";
import Page from "~/components/logic/lSideBar/Page.vue";

const auth = useAuth();
const user = auth.data as unknown as User;

const pages: Page[] = [
  {
    icon: 'users',
    title: 'Пользователи',
    link: '/users',
    if: () => user.value.role === 'ADMIN'
  },
  {
    icon: 'boxes',
    title: 'Продукты',
    link: '/products'
  },
  {
    icon: 'profile',
    title: 'Профиль',
    link: '/profile'
  },
  {
    icon: 'star',
    title: 'Отзывы',
    link: '/reviews',
    if: () => user.value.role !== 'USER'
  },
  {
    icon: 'basket',
    title: 'Корзина',
    link: '/basket',
    if: () => user.value.role === 'USER'
  },
  {
    icon: 'basket',
    title: 'Заказы',
    link: '/',
    if: () => user.value.role === 'ADMIN'
  },
  {
    icon: 'send',
    title: 'Помощь',
    link: 'https://t.me/FaemerAndPointINFOBot'
  },
];

function logout() {
  auth.signOut( { callbackUrl: '/login' });
}
</script>

<template>
  <div class="side-bar">
    <div class="side-bar__logo">
      <nuxt-icon name="tree"/>
      <div class="side-bar__logo__name">
        <h2>FARMER&.</h2>
        <p>Фермер И Точка</p>
      </div>
    </div>
    <div class="side-bar__pages">
      <Page
          class="side-bar__pages__page"
          v-for="page in pages"
          :key="page.link"
          :value="page"
      />
    </div>
    <div class="side-bar__profile">
      <div class="side-bar__profile__add">
        <nuxt-icon name="profile"/>
        <h3>{{user.name}}</h3>
      </div>
      <nuxt-icon class="side-bar__profile__logout" name="logout" @click="logout"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px 0 35px 35px;

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &__name {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      & h2 {
        font-size: 30px;
        font-family: Popping, sans-serif;
        letter-spacing: -2px;
      }
      & p {
        font-size: 10px;
        letter-spacing: 3px;
        position: absolute;
        bottom: -6px;
      }
    }
    & .nuxt-icon {
      font-size: 50px;
    }
  }
  &__pages {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 20px;
    background-color: var(--frame-bg);
    box-shadow: 0 0 20px -5px var(--shadow);
    user-select: none;

    &__add {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &__logout {
      cursor: pointer;
    }
    & .nuxt-icon {
      font-size: 40px;
    }
    & h3 {
      font-weight: 400;
      font-size: 25px;
    }
  }
}
</style>
