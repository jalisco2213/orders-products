<script setup>
import List from "@/components/svg/List.vue";
import Trash from "@/components/svg/Trash.vue";
import ArrowRight from "@/components/svg/ArrowRight.vue";

const {orders, selectedOrder, isDetailsOpen} = defineProps({
  orders: {
    type: Array,
    required: true
  },
  selectedOrder: {
    type: Object,
    default: null
  },
  isDetailsOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-order', 'delete-order']);

function formatTime(dateStr) {
  const date = new Date(dateStr);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('ru-RU', {month: 'long'});
  const year = date.getFullYear();
  return `${day} / ${month.charAt(0).toUpperCase() + month.slice(1)} / ${year}`;
}

function handleDelete(order, event) {
  event.stopPropagation();
  emit('delete-order', order);
}
</script>

<template>
  <div class="orders-wrapper">
    <div class="orders-main">
      <div class="orders-item"
           v-for="order in orders"
           :key="order.id"
           :class="{ 'active': selectedOrder?.id === order.id }">

        <div v-if="!isDetailsOpen" class="orders-item_name">{{ order.name }}</div>

        <div class="orders-item_count">
          <List @click="emit('select-order', order)"/>

          <div class="orders-item_count__length">
            <p style="font-weight: 500">
              {{ order.products.length }}
            </p>
            <span style="font-weight: 100">Продукта</span>
          </div>
        </div>

        <div class="orders-item_date">
          <div>
            <div style="font-weight: 100" class="time">{{ formatTime(order.date) }}</div>
            <div class="date">{{ formatDate(order.date) }}</div>
          </div>
        </div>

        <div v-if="!isDetailsOpen" class="orders-item_trash">
          <Trash style="cursor: pointer"/>
        </div>

        <div class="orders-item_arrow">
          <ArrowRight class="arrow-right" v-if="selectedOrder?.id === order.id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-wrapper {
  width: 100%;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  max-width: 1440px;
}

.orders-main {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 1440px;
  padding-bottom: 21px;
  width: 100%;
}

.orders-item {
  position: relative;
  align-items: center;
  background-color: #fff;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  gap: 10px;
  grid-auto-rows: 1fr;
  grid-template-columns: minmax(167px, 425px) 131px 112px minmax(40px, 122px) 26px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  padding: 10px 23px 10px 36px;
  transition: box-shadow .25s ease;

  .orders-item_name {
    display: block;
    font-size: 16px;
    position: relative;
    text-align: left;
    text-decoration-color: #546e7a;
    text-decoration: underline;
  }

  .orders-item_count {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .orders-item_date {
    gap: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 13px;
  }

  .orders-item_arrow {
    display: block;
    position: absolute;
    right: 10px;
  }
}

</style>