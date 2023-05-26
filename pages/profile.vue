<script setup lang="ts">
import {useAuth, useUtils} from "#imports";
import Card from "~/components/Build/Card.vue";
import Products from "~/components/Build/Products.vue";

const {formatDate} = useUtils();
const auth = useAuth();
const user = auth.data as unknown as User;

function changePhoto(e: Event) {
  const DOMInput = e.target as HTMLInputElement;
  if (DOMInput.files?.length) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      console.log(fileReader.result)
    }
    fileReader.readAsDataURL(DOMInput.files[0]);
  }
}
</script>

<template>
  <div class="profile">
    <div class="profile__info">
      <div v-if="user.role === 'USER'" class="profile__info__rates">
        <div class="profile__rates__header">
          <h1>Отзывы</h1>
        </div>
        <UILHr/>
        <div class="profile__rates__list">
          <div class="profile__rates__list__rates">
            <div
                class="profile__rates__list__rates__rate"
            >

            </div>
          </div>
        </div>
      </div>
      <div v-if="user.role === 'FARMER'" class="profile__info__farmer">
        <card/>
        <products/>
      </div>
    </div>
    <div class="profile__user">
      <div class="profile__user__avatar">
        <input type="file" id="profile-img" @change="changePhoto">
        <label for="profile-img">
          <span>Загрузить</span>
        </label>
      </div>
      <div class="profile__user__name">
        <h2>{{user.name}}</h2>
        <p>{{user.role}}</p>
      </div>
      <UILHr/>
      <div class="profile__user__info">
        <div class="profile__user__info__row">
          <h4>Почта</h4>
          <p>{{user.email}}</p>
        </div>
        <div class="profile__user__info__row">
          <h4>Телефон</h4>
          <p>{{user.phone}}</p>
        </div>
        <div class="profile__user__info__row">
          <h4>Дата регистрации</h4>
          <p>{{formatDate(user.dateRegistration)}}</p>
        </div>
        <div class="profile__user__info__row">
          <h4>Скидка</h4>
          <p>{{user.discount ? `${user.discount}%` : 'отсутствует'}}</p>
        </div>
        <div class="profile__user__info__row">
          <h4>Карта</h4>
          <p>{{user.card ? 'привязана' : 'нет'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  height: 100%;

  &__info {
    width: 70%;
    padding-right: 30px;

    &__farmer {
    }
    & .l-hr {
      width: 95%;
      margin: 20px 0;
    }
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
    box-shadow: 0 0 10px -3px var(--border);

    &__avatar {
      position: relative;
      width: min(70%, 300px);
      height: min(70%, 300px);
      margin-bottom: 40px;
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
    &__name {
      & h2 {
        font-size: 28px;
      }
      & p {
        font-size: 18px;
        text-align: center;
        color: var(--text-2);
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      padding: 0 20px;

      &__row {
        display: flex;
        gap: 10px;

        & h4 {
          font-size: 24px;
          width: 60%;
        }
        & p {
          font-size: 22px;
          width: 40%;
        }
      }
    }
    & .l-hr {
      width: 85%;
      margin: 50px 0;
      border: 1.5px solid var(--text-2);
    }
  }
}
</style>
