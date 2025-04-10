<script setup>
import Trash from "@/components/svg/Trash.vue";


defineProps({
  itemName: String,
  itemImage: String,
  itemSerial: String
});

const emit = defineEmits(['cancel', 'confirm']);
</script>

<template>
  <div class="delete-popup">
    <div class="delete-popup__overlay ">
      <div class="delete-popup__content animation-modal">
        <h3 class="delete-popup__title">Вы уверены, что хотите удалить этот приход?</h3>
        <div class="line"></div>

        <div class="delete-popup__item">
          <div class="delete-popup__item-image">
            <img :src="itemImage" alt="Изображение продукта" style="width: 50px; height: 50px; object-fit: contain;">
          </div>
          <div class="delete-popup__item-info">
            <p class="delete-popup__item-name">{{ itemName }}</p>
            <p class="delete-popup__item-serial">Серийный номер: {{ itemSerial }}</p>
          </div>
        </div>

        <div class="delete-popup__actions">
          <button
              class="delete-popup__button delete-popup__button--cancel"
              @click="$emit('cancel')"
          >
            ОТМЕНИТЬ
          </button>

          <button

              class="delete-popup__button delete-popup__button--confirm"
              @click="$emit('confirm')"
          >

            <Trash/>
            УДАЛИТЬ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.delete-popup {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  &__content {
    background-color: white;
    border-radius: 8px;
    max-width: 100%;
    width: 600px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  &__title {
    padding: 20px 24px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
  }

  &__order {
    padding: 10px 24px;
    margin-bottom: 24px;

    &-name {
      font-size: 16px;
      color: #333;
      margin-bottom: 4px;
    }

    &-sn {
      font-size: 14px;
      color: #666;
    }
  }

  &__actions {
    padding: 20px;
    background: #86be47;
    display: flex;
    justify-content: end;
    gap: 12px;
  }

  &__button {
    float: right;
    padding: 10px 30px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: 0.2s ease;

    &--confirm {
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: #eee;
      color: #111;

      &:hover {
        background-color: #ffe9e9;
        transition: 0.2s ease;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__info-item {
    display: flex;
  }

  &__info-label {
    font-weight: 600;
    color: #333;
    width: 60px;
  }

  &__info-value {
    color: #666;
    flex: 1;
  }
}

.delete-popup__item {
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.delete-popup__item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.delete-popup__item-name {
  font-weight: bold;
  margin: 0;
}

.delete-popup__item-serial {
  margin: 0;
  font-size: 0.9em;
  color: #666;
}

</style>