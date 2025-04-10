<script setup>
import {ref} from 'vue';
import OrdersList from '@/components/Orders/OrderList.vue';
import OrderDetails from '@/components/Orders/OrderDetail.vue';
import DeletePopup from '@/components/Orders/DeletePopup.vue';
import {orders} from '../data/orders.js';

const ordersList = orders();
const selectedOrder = ref(null);
const showDeletePopup = ref(false);
const isDetailsOpen = ref(false);

const selectOrder = (order) => {
  selectedOrder.value = order;
  isDetailsOpen.value = true;
};

const closeDetails = () => {
  selectedOrder.value = null;
  isDetailsOpen.value = false;
};

const deleteOrder = () => {
  if (selectedOrder.value) {
    const index = ordersList.findIndex(o => o.id === selectedOrder.value.id);
    if (index !== -1) {
      ordersList.splice(index, 1);
    }
    closeDetails();
    showDeletePopup.value = false;
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="orders-header">
      <div class="orders-header_add">
        <span>+</span>
      </div>
      <h1>Приходы</h1>
    </div>

    <div class="orders-container">
      <div class="order-table">
        <OrdersList
            :orders="ordersList"
            :selectedOrder="selectedOrder"
            :isDetailsOpen="isDetailsOpen"
            @select-order="selectOrder"
            @delete-order="(order) => { selectedOrder = order; showDeletePopup = true; }"
        />

        <OrderDetails
            v-if="selectedOrder"
            :order="selectedOrder"
            @close="closeDetails"
            @delete-order="showDeletePopup = true"
        />
      </div>

      <DeletePopup
          v-if="showDeletePopup"
          :orderName="selectedOrder?.name"
          @cancel="showDeletePopup = false"
          @confirm="deleteOrder"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.orders-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  &_add {
    border: 3px solid #64d65e;
    border-radius: 50%;
    font-size: 20px;
    color: #fff;
    width: 40px;
    height: 40px;
    background: #0ab900;
    transition: .3s ease-in-out;
    cursor: pointer;

    &:hover {
      background: #1ddb13;
      transition: .3s ease-in-out;
    }

    span {
      user-select: none;
      padding: 3px 0 0 0;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.order-table {
  display: flex;
}
</style>
