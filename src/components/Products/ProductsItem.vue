<script setup>
import { computed } from 'vue'

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

const formattedStartDate = computed(() => {
  return new Date(props.product.guarantee.start).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, ' / ')
})

const formattedEndDate = computed(() => {
  return new Date(props.product.guarantee.end).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, ' / ')
})

const alternativeDateFormat = computed(() => {
  const date = new Date(props.product.guarantee.start)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('default', { month: 'short' })
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
</script>

<template>
  <div class="product-card">
    <div class="product-title">
      {{ product.title }}
    </div>

    <div class="product-serial">
      {{ product.serialNumber }}
    </div>

    <div class="product-details">
      <div class="detail-row">
        <span class="detail-label">Guarantee:</span>
        <span class="detail-value">{{ alternativeDateFormat }} - {{ formattedEndDate }}</span>
      </div>

      <div class="detail-row prices">
        <span v-for="(price, index) in product.price" :key="index" class="price">
          {{ formatPrice(price.value) }} {{ price.symbol }}
        </span>
      </div>

      <div class="detail-row order-info">
        <span class="order-label">Order:</span>
        <span class="order-name">{{ getOrderName(product.order) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
}

.product-serial {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
}

.product-details {
  font-size: 0.85rem;
}

.detail-row {
  display: flex;
  margin-bottom: 5px;
  line-height: 1.3;
}

.detail-label {
  font-weight: bold;
  min-width: 80px;
  color: #555;
}

.detail-value {
  color: #222;
}

.prices {
  margin-top: 8px;
}

.price {
  margin-right: 15px;
  font-weight: bold;
  color: #0066cc;
}

.order-info {
  margin-top: 8px;
  border-top: 1px dashed #ddd;
  padding-top: 8px;
}

.order-label {
  font-weight: bold;
  color: #555;
}

.order-name {
  color: #333;
  font-style: italic;
  margin-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>