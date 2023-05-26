<script setup lang="ts">
import {useAuth} from "#imports";

const auth = useAuth();
const user = auth.data as unknown as User;
</script>

<template>
  <div class="profile">
    <div class="profile__rates">

    </div>
    <div class="profile__user">
      <div class="profile__user__avatar">
        <input type="file" id="profile-img">
        <label for="profile-img">
          <span>Загрузить</span>
        </label>
      </div>
      <div class="profile__user__name">
        <h2>{{user.name}}</h2>
        <p>{{user.login}}</p>
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
      position: relative;
      width: min(70%, 300px);
      height: min(70%, 300px);
      border-radius: 100%;
      background-color: #fff;

      & input {
        display: none;
      }
      & label {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        opacity: 0;

        &:hover {
          opacity: 1;
        }
        & span {
          font-size: 24px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
