<script setup>
import {computed, ref} from 'vue'
import Trash from "@/components/svg/Trash.vue";
import DeletePopup from "@/components/DeletePopup.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  orders: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'delete-product']);

const showDeleteModal = ref(false)

const formattedEndDate = computed(() => {
  const date = new Date(props.product.guarantee.end)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('default', {month: 'short'})
  const year = date.getFullYear()
  return `${day} / ${month} / ${year}`
})

const alternativeDateFormat = computed(() => {
  const date = new Date(props.product.guarantee.start)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('default', {month: 'short'})
  const year = date.getFullYear()
  return `${day} / ${month} / ${year}`
})

const getOrderName = (orderId) => {
  const order = props.orders.find(o => o.id === orderId)
  return order ? order.name : 'Unknown Order'
}

const formatPrice = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const handleDeleteClick = () => {
  showDeleteModal.value = true
}

const confirmDelete = () => {
  emit('delete-product', props.product.id)
  showDeleteModal.value = false
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

</script>

<template>
  <div class="product-card">
    <div class="product-card__indicator">
      <div v-if="product.isNew === 1" class="green"></div>
      <div v-else class="black"></div>
    </div>

    <div class="product-card__img">
      <img :src="'/' + product.photo" :alt="product.title">
    </div>

    <div class="product-card__title">
      <div class="title-text">{{ product.title }}</div>
      <div class="product-card__serial">
        S/N: {{ product.serialNumber }}
      </div>
    </div>

    <div class="product-card__status">
      <p v-if="product.isNew === 1" class="status-available">свободен</p>
      <p v-else class="status-in-repair">В ремонте</p>
    </div>

    <div class="product-card__guarantee">
      <span class="guarantee-text">с {{ alternativeDateFormat }} <br> по {{ formattedEndDate }}</span>
    </div>

    <div class="product-card__order">
      <span>{{ getOrderName(product.order) }}</span>
    </div>

    <div class="product-card__price">
      <p v-for="(price, index) in product.price" :key="index">
        {{ formatPrice(price.value) }} {{ price.symbol }} <br>
      </p>
    </div>

    <div class="product-card__trash" @click="handleDeleteClick">
      <Trash/>
    </div>
  </div>

  <DeletePopup
    v-if="showDeleteModal"
    :item-name="product.title"
    :item-image="'/' + product.photo"
    :item-serial="product.serialNumber"
    @cancel="cancelDelete"
    @confirm="confirmDelete"
  />
</template>

<style scoped lang="scss">
.product-card {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  padding: 10px 15px;
  transition: box-shadow 0.25s ease;
  margin-bottom: 10px;
  gap: 10px;

  & > div {
    flex: 1 1 auto;
    min-width: 0;
    padding: 5px;
  }

  &__indicator {
    flex: 0 0 10px;
    .green, .black {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .green {
      background: #0ab900;
    }
    .black {
      background: #1e2325;
    }
  }

  &__img {
    flex: 0 0 60px;
    img {
      width: 40px;
      height: auto;
      display: block;
    }
  }

  &__title {
    flex: 2 1 150px;
    .title-text {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__serial {
    font-size: 0.8rem;
    color: #666;
    font-family: 'Courier New', monospace;
  }

  &__status {
    flex: 1 1 100px;
    text-align: center;
    .status-available {
      color: forestgreen;
      font-weight: 500;
      font-size: 14px;
      margin: 0;
    }
    .status-in-repair {
      color: black;
      font-weight: 500;
      font-size: 14px;
      margin: 0;
    }
  }

  &__guarantee {
    flex: 2 1 180px;
    .guarantee-text {
      color: #222;
      line-height: 1.3;
    }
  }

  &__order {
    flex: 2 1 150px;
    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
  }

  &__price {
    flex: 1 1 100px;
    text-align: center;
    span {
      display: inline-block;
    }
  }

  &__trash {
    flex: 0 0 24px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
}

@media (max-width: 1200px) {
  .product-card {
    &__guarantee {
      flex-basis: 160px;
    }
    &__order {
      flex-basis: 130px;
    }
  }
}

@media (max-width: 992px) {
  .product-card {
    &__title {
      flex-basis: 120px;
    }
    &__guarantee {
      flex-basis: 140px;
    }
    &__order {
      flex-basis: 110px;
    }
  }
}

@media (max-width: 768px) {
  .product-card {
    padding: 8px 10px;
    gap: 8px;

    &__title {
      order: 1;
      flex-basis: calc(100% - 100px);
    }

    &__img {
      order: 0;
      flex-basis: 50px;
    }

    &__indicator {
      order: -1;
    }

    &__status {
      order: 2;
      flex-basis: 80px;
      text-align: left;
    }

    &__guarantee {
      order: 3;
      flex-basis: 100%;
    }

    &__order {
      order: 4;
      flex-basis: calc(50% - 20px);
    }

    &__price {
      order: 5;
      flex-basis: calc(50% - 20px);
      text-align: right;
    }

    &__trash {
      order: 6;
      flex-basis: 24px;
      margin-left: auto;
    }
  }
}

@media (max-width: 576px) {
  .product-card {
    &__title {
      .title-text {
        font-size: 14px;
      }
    }

    &__serial {
      font-size: 0.7rem;
    }

    &__status {
      p {
        font-size: 13px;
      }
    }

    &__guarantee {
      font-size: 13px;
    }

    &__order {
      font-size: 13px;
    }

    &__price {
      font-size: 13px;
    }
  }
}

@media (max-width: 400px) {
  .product-card {
    &__title {
      flex-basis: calc(100% - 70px);
    }

    &__img {
      flex-basis: 40px;
    }

    &__status {
      flex-basis: 70px;
    }
  }
}
</style>