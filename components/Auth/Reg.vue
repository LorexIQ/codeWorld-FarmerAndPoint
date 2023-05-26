<script setup lang="ts">
import SmartInput from "~/components/Smart/Input";
import {useSmartInputs} from "~/components/Smart/Input/composables";
import {ref, useAuth, watch} from "#imports";
import {useSmartButton} from "~/components/Smart/Button/composables";
import {ButtonFetchStatus} from "~/components/Smart/Button/types/entities";
import LNuxtLink from "~/components/UI/lNuxtLink.vue";
import LRadioCard from "~/components/UI/lRadioCard.vue";

const auth = useAuth()
const button = useSmartButton();
const inputs = useSmartInputs({
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
  name: {
    regex: {
      pattern: new RegExp('^.{10,}$'),
      error: 'Слишком короткое ФИО'
    },
    attrs: {
      placeholder: 'ФИО'
    }
  },
  phone: {
    regex: {
      pattern: new RegExp('^((\\+7|7|8)+([\\- ]?))+(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'),
      error: 'Неверный формат номера телефона'
    },
    attrs: {
      placeholder: 'Номер телефона'
    }
  },
  address: {
    regex: {
      pattern: new RegExp('^.{10,}$'),
      error: 'Адрес слишком короткий'
    },
    attrs: {
      placeholder: 'Адрес'
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

const roleUser = ref('USER');
const error = ref('');

async function signUp() {
  if (inputs.check()) {
    button.fetch(auth.signUp({
      ...inputs.values,
      role: roleUser.value
    }, {callbackUrl: '/'}))
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
        <h4>FARMER&.</h4>
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
          id="auth-name"
          type="text"
          icon="user"
          :value="inputs.store.name"
      />
      <SmartInput
          id="auth-phone"
          type="text"
          icon="call"
          :value="inputs.store.phone"
      />
      <SmartInput
          id="auth-address"
          type="text"
          icon="location"
          :value="inputs.store.address"
      />
      <SmartInput
          id="password-auth"
          type="password"
          icon="pass"
          :value="inputs.store.password"
      />
      <div class="auth__body__cards">
        <LRadioCard
            id="USER"
            namespace="user"
            name="Клиент"
            icon="import"
            :checked="true"
            v-model:value="roleUser"
        />
        <LRadioCard
            id="FARMER"
            namespace="user"
            name="Фермер"
            icon="export"
            v-model:value="roleUser"
        />
      </div>
    </div>
    <div class="auth__footer">
      <span class="auth__footer__error">{{ error }}</span>
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
