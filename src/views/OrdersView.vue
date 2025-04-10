<script setup>
import { ref } from 'vue';
import { orders } from '../data/orders.js'

const ordersList = orders();

const selectedOrder = ref(null);
const showDeletePopup = ref(false);

const selectOrder = (order) => {
  selectedOrder.value = order;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDateAlt = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const calculateTotal = (products, currency) => {
  return products.reduce((sum, product) => {
    const price = product.price.find(p => p.symbol === currency);
    return sum + (price ? price.value : 0);
  }, 0);
};

const deleteOrder = () => {
  if (selectedOrder.value) {
    const index = ordersList.findIndex(o => o.id === selectedOrder.value.id);
    if (index !== -1) {
      ordersList.splice(index, 1);
    }
    selectedOrder.value = null;
    showDeletePopup.value = false;
  }
};

</script>

<template>
  <div class="wrapper">
    <div class="orders-header">
      <div class="orders-header_add">
        <span>
          +
        </span>
      </div>

      <h1>Приходы</h1>
    </div>

    <div class="orders-container">
      <div class="orders-list">
        <div v-for="order in ordersList" :key="order.id" class="order-item"
          :class="{ 'active': selectedOrder?.id === order.id }" @click="selectOrder(order)">
          <div class="order-name">{{ order.name }}</div>
          <div class="order-products-count">{{ order.products.length }} продуктов</div>
        </div>
      </div>

      <div v-if="selectedOrder" class="order-details">
        <button class="close-btn" @click="selectedOrder = null">×</button>

        <h2>{{ selectedOrder.name }}</h2>

        <div class="order-info">
          <div class="info-row">
            <span class="label">Количество продуктов:</span>
            <span>{{ selectedOrder.products.length }}</span>
          </div>

          <div class="info-row">
            <span class="label">Дата создания:</span>
            <span>{{ formatDate(selectedOrder.date) }}</span>
          </div>

          <div class="info-row">
            <span class="label">Дата создания (альтернативный формат):</span>
            <span>{{ formatDateAlt(selectedOrder.date) }}</span>
          </div>

          <div class="info-row">
            <span class="label">Сумма прихода:</span>
            <span>{{ calculateTotal(selectedOrder.products, 'USD') }} USD /
              {{ calculateTotal(selectedOrder.products, 'UAH') }} UAH</span>
          </div>
        </div>

        <button class="delete-btn" @click="showDeletePopup = true">Удалить приход</button>
      </div>

      <div v-if="showDeletePopup" class="popup-overlay">
        <div class="popup">
          <h3>Подтвердите удаление</h3>
          <p>Вы уверены, что хотите удалить приход "{{ selectedOrder?.name }}"?</p>
          <div class="popup-buttons">
            <button class="cancel-btn" @click="showDeletePopup = false">Отмена</button>
            <button class="confirm-btn" @click="deleteOrder">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.orders-header {
  display: flex;
  align-items: center;
  gap: 10px;

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


.orders-container {
  display: flex;
  height: 100%;
}

.orders-list {
  width: 300px;
  border-right: 1px solid #eee;
  overflow-y: auto;
}

.order-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.order-item:hover {
  background-color: #f5f5f5;
}

.order-item.active {
  background-color: #e0e0e0;
}

.order-name {
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-products-count {
  color: #666;
  font-size: 0.9em;
}

.order-details {
  flex: 1;
  padding: 20px;
  position: relative;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.order-info {
  margin-top: 20px;
}

.info-row {
  margin-bottom: 10px;
  display: flex;
}

.label {
  font-weight: bold;
  margin-right: 10px;
  min-width: 250px;
}

.delete-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.popup h3 {
  margin-top: 0;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #bdbdbd;
}

.confirm-btn {
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #cc0000;
}
</style>