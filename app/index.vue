<script setup lang="ts">
import {useAuth, useNuxtApp} from "#imports";
import axios from "axios";

const auth = useAuth();
const {$selectedTheme, $selectedThemeClass} = useNuxtApp();
</script>

<template>
  <div class="app" :class="$selectedTheme">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background: var(--background);
  overflow: hidden;
}
</style>
