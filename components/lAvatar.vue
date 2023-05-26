<script setup lang="ts">
import {useLFetch} from "#imports";

interface Props {
  value: string
}
interface Emits {
  (e: 'changePhoto', value: string): void
  (e: 'update:value', value: string): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function changePhoto(e: Event) {
  const DOMInput = e.target as HTMLInputElement;

  if (DOMInput.files?.length) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.result) {
        emit('changePhoto', fileReader.result as string);
        emit('update:value', fileReader.result as string);
      }
    }

    fileReader.readAsDataURL(DOMInput.files[0]);
  }
}
</script>

<template>
  <div class="avatar">
    <img :src="value" alt="Error">
    <input type="file" id="profile-img" @change="changePhoto">
    <label for="profile-img">
      <span>Загрузить</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 40px;
  border-radius: 100%;
  background-color: #fff;
  box-shadow: 0 0 15px -5px var(--shadow);
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
</style>
