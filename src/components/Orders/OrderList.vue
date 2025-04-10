<script setup>
import List from "@/components/svg/List.vue";
import Trash from "@/components/svg/Trash.vue";

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
        <td v-if="!isDetailsOpen">
          <div class="name">{{ order.name }}</div>
        </td>

        <td>
          <div @click="emit('select-order', order)" class="list">
            <List/>
          </div>
        </td>

        <td class="product">
          <p>
            {{ order.products.length }}
          </p>
          <span>Продукта</span>
        </td>

        <td style="text-align: center">
          <div class="date">{{ formatTime(order.date) }}</div>
          <div>{{ formatDate(order.date) }}</div>
        </td>

        <td v-if="!isDetailsOpen">
          <Trash @click.stop="handleDelete(order, $event)" style="cursor: pointer"/>
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

.orders-table {
  cursor: default;
  color: #4f4f4f;

  td {
    padding: 10px;
  }

  .date {
    font-size: 12px;
    font-weight: 100;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .product {
    p {
      font-weight: 500;
    }

    span {
      font-weight: 100;
    }
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
    font-size: 20px;
  }
}
</style>