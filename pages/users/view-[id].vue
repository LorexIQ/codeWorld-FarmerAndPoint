<script setup lang="ts">

</script>

<template>
  <div class="profile">
    <div class="profile__rates">

    </div>
    <div class="profile__user">
      <div class="profile__user__avatar">
        <input type="file">

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  height: 100%;

  &__rates {
    width: 70%;
  }
  &__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    height: calc(100% + 60px);
    padding: 30px;
    margin: -30px -30px -30px 0;
    background-color: var(--frame-bg-2);

    &__avatar {
      width: min(70%, 300px);
      height: min(70%, 300px);
      border-radius: 100%;
      background-color: #000;
    }
  }
}
</style>
