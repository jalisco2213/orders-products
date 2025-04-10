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
  <div class="orders-list">
    <table class="orders-table">
      <tbody>
      <tr
          v-for="order in orders"
          :key="order.id"
          :class="{ 'active': selectedOrder?.id === order.id }"
      >
        <td v-if="!isDetailsOpen" class="name-cell">
          <div class="name">{{ order.name }}</div>
        </td>

        <td @click="emit('select-order', order)" class="list-cell">
          <div class="list">
            <List/>
          </div>
        </td>

        <td class="product-cell">
          <p class="product-count">
            {{ order.products.length }}
          </p>
          <span class="product-label">Продукта</span>
        </td>

        <td class="date-cell">
          <div class="time">{{ formatTime(order.date) }}</div>
          <div class="date">{{ formatDate(order.date) }}</div>
          <ArrowRight class="arrow-right" v-if="selectedOrder?.id === order.id"/>
        </td>

        <td v-if="!isDetailsOpen" class="action-cell">
          <Trash style="cursor: pointer"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-list {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.orders-table {
  cursor: default;
  color: #4f4f4f;
  min-width: 300px;
  width: 100%;

  td {
    background: #fff;
    padding: 8px 12px;
    position: relative;
  }

  .time {
    font-size: 12px;
    font-weight: 100;
    white-space: nowrap;
  }

  .date {
    white-space: nowrap;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: relative;
    cursor: pointer;
    transition: .5s ease-in-out;

    &:hover {
      background: #ddd;
      transition: .5s ease-in-out;
    }
  }

  .arrow-right {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #4f4f4f;
  }

  .product-count {
    font-weight: 500;
    margin: 0;
  }

  .product-label {
    font-weight: 100;
    font-size: 0.8em;
  }

  tr {
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      background-color: #f3f3f3;
    }
  }

  .name {
    text-decoration: underline;
    font-size: 16px;
    white-space: nowrap;
    overflow: auto;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .orders-table {
    td {
      padding: 6px 8px;
    }

    .name {
      font-size: 14px;
      max-width: 100px;
    }

    .list {
      width: 28px;
      height: 28px;
    }

    .product-count {
      font-size: 14px;
    }

    .product-label {
      font-size: 0.7em;
    }

    .time, .date {
      font-size: 11px;
    }
  }
}

@media (max-width: 480px) {
  .orders-table {
    td {
      padding: 4px 6px;
    }

    .name {
      font-size: 12px;
      max-width: 80px;
    }

    .list {
      width: 24px;
      height: 24px;
    }

    .product-cell {
      display: none; /* Скрываем количество продуктов на очень маленьких экранах */
    }

    .time, .date {
      font-size: 10px;
    }
  }
}
</style>