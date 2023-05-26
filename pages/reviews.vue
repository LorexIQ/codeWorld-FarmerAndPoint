<script setup lang="ts">
import {useAuth, useLFetch} from "#imports";
import LRateStars from "~/components/UI/lRateStars.vue";

const auth = useAuth();
const user = auth.data as unknown as User;

const reviews = await useLFetch<Review[]>(`/reviews/reviews-by-id?id=${user.value.id}`);
</script>

<template>
  <div class="page-reviews">
    <h1>Отзывы</h1>
    <UILHr/>
    <div class="page-reviews__container">
      <div class="page-reviews__container__reviews">
        <div
            class="page-reviews__container__reviews__review"
            v-for="review in reviews"
            :key="review.id"
        >
          <div class="page-reviews__container__reviews__review__header">
            <div class="page-reviews__container__reviews__review__header__client">
              <h3>{{review.nameUser}}</h3>
            </div>
            <div class="page-reviews__container__reviews__review__header__rate">
              <LRateStars :value="3"/>
            </div>
          </div>
          <UILHr/>
          <div class="page-reviews__container__reviews__review__content">
            <p>{{review.reviews}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.l-hr {
  margin: 20px 0;
}
.page-reviews {
  height: 100%;
  &__container {
    height: calc(100% - 80px);
    overflow-y: auto;
    &__reviews {
      &__review {
        margin-bottom: 15px;
        padding: 20px;
        border: 1px solid var(--border);
        border-radius: 10px;

        &__header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          &__client {
            font-size: 24px;
            padding-left: 20px;
          }
          &__rate {}
        }
        &__content {
          font-size: 22px;
          padding: 10px;
        }
      }
    }
  }
}
</style>
