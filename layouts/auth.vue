<script setup lang="ts">

</script>

<template>
  <div class="auth-layout">
    <div class="auth-layout__center-box">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &__center-box {
    width: min(350px, 90%);
  }
}
</style>
