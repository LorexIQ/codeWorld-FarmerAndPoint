<script setup lang="ts">
import SmartInput from "~/components/Smart/Input";
import {UseSmartInputs} from "~/components/Smart/Input/composables";
import {ref, useAuth, watch} from "#imports";
import {useSmartButton} from "~/components/Smart/Button/composables";
import {ButtonFetchStatus} from "~/components/Smart/Button/types/entities";
import LNuxtLink from "~/components/UI/lNuxtLink.vue";

const auth = useAuth()
const button = useSmartButton();
const inputs = UseSmartInputs({
  login: {
    regex: {
      pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9]{4,11}$'),
      error: 'Логин должен состоять из букв и цифр. Длина от 5 до 12'
    },
    attrs: {
      placeholder: 'Логин'
    }
  },
  email: {
    regex: {
      pattern: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      error: 'Неверный формат почты'
    },
    attrs: {
      placeholder: 'Почта'
    }
  },
  password: {
    regex: {
      pattern: new RegExp('^[a-zA-Z0-9]{5,20}$'),
      error: 'Пароль должен состоять из букв и цифр. Длина от 5 до 20'
    },
    attrs: {
      placeholder: 'Пароль'
    }
  }
});

const error = ref('');

async function signUp() {
  if (inputs.check()) {
    button.fetch(auth.signUp(inputs.values, { callbackUrl: '/' }))
        .catch(err => {
          error.value = err;
        });
  } else {
    button.dropStatus();
  }
}

if (auth.status.value == 'authenticated') {
  button.status.value = ButtonFetchStatus.SUCCESS;
}
watch(auth.status, (value) => {
  if (value === 'unauthenticated') {
    button.dropStatus();
  }
})
</script>

<template>
  <form @submit.prevent="signUp" class="auth">
    <div class="auth__title">
      <div class="auth__title__logo">
        <nuxt-icon name="tree"/>
        <h4>KOLKHOZ 2.0</h4>
      </div>
      <h2>Создание аккаунта</h2>
    </div>
    <div class="auth__body">
      <SmartInput
          id="auth-login"
          type="text"
          icon="userCard"
          :value="inputs.store.login"
      />
      <SmartInput
          id="auth-email"
          type="text"
          icon="email"
          :value="inputs.store.email"
      />
      <SmartInput
          id="password-auth"
          type="password"
          icon="pass"
          :value="inputs.store.password"
      />
    </div>
    <div class="auth__footer">
      <span class="auth__footer__error">{{error}}</span>
      <smart-button
          type="submit"
          :value="button"
      >
        <template v-slot:default>Регистрация</template>
        <template v-slot:loading>Загрузка...</template>
      </smart-button>
      <l-nuxt-link to="/login">Есть аккаунт? Войти</l-nuxt-link>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "auth.module";
</style>
