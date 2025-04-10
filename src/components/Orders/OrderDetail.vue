<script setup>
defineProps(['order']);
const emit = defineEmits(['close', 'delete-order']);

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
</script>

<template>
  <div v-if="order" class="order-details">
    <button class="close-btn" @click="$emit('close')">×</button>

    <h2>{{ order.name }}</h2>

    <div class="order-info">
      <div class="info-row">
        <span class="label">Количество продуктов:</span>
        <span>{{ order.products.length }}</span>
      </div>

      <div class="info-row">
        <span class="label">Дата создания:</span>
        <span>{{ formatDate(order.date) }}</span>
      </div>

      <div class="info-row">
        <span class="label">Дата создания (альтернативный формат):</span>
        <span>{{ formatDateAlt(order.date) }}</span>
      </div>

      <div class="info-row">
        <span class="label">Сумма прихода:</span>
        <span>{{ calculateTotal(order.products, 'USD') }} USD /
          {{ calculateTotal(order.products, 'UAH') }} UAH</span>
      </div>
    </div>

    <button class="delete-btn" @click="$emit('delete-order')">Удалить приход</button>
  </div>
</template>

<style scoped>
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
</style>
