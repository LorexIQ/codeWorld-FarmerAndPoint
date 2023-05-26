<script setup lang="ts">
import {useAuth, useNuxtApp, useRouter, watch} from "#imports";
import {User} from "~/components/logic/types/lNavBar";
import {ref} from "@vue/reactivity";
import LSwitch from "~/components/UI/lSwitch.vue";
import {useSmartButton} from "~/components/Smart/Button/composables";

const logoutBtn = useSmartButton();
const auth = useAuth();
const router = useRouter();
const {$userId, $selectedTheme, $setTheme} = useNuxtApp();
const user = auth.data.value as User;
let isDarkTheme = ref($selectedTheme.value === 'dark-mode');

watch(isDarkTheme, value => {
  $setTheme(value ? 'dark-mode' : 'light-mode');
});
function signOut() {
  router.push('/login');
  logoutBtn.fetch(auth.signOut( { callbackUrl: '/login' }));
}
</script>

<template>
  <div class="nav-bar">
    <div class="nav-bar__profile">
      <l-switch v-model:value="isDarkTheme"/>
      <UserCard :client="`${user.login} [${$userId}]`" :button="true">
        <template #button>
          <smart-button :value="logoutBtn" @click="signOut">
            <template #loading>Выход...</template>
            <template #default>Выйти</template>
          </smart-button>
        </template>
      </UserCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  gap: 10px 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border-left: 0;
  border-radius: 0 0 7px;

  &__pages {
    display: flex;
    gap: 10px;
    border-radius: 7px;
    overflow: hidden;
  }
  &__profile {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: min(16px, 3vw);
  }

  @media (min-width: 400px) {
    justify-content: space-between;
  }
}
</style>
