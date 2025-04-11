<script setup>
import { computed, ref } from 'vue';
import ProductItem from '@/components/Products/ProductsItem.vue';
import ProductFilter from '@/components/Products/ProductsFilter.vue';
import { orders } from '@/data/orders';

const ordersData = ref(orders());
const selectedType = ref(null);

const flattenProducts = (ordersArray) => {
  return ordersArray.flatMap(order => order.products || []);
};

const products = ref(flattenProducts(ordersData.value));

const uniqueProductTypes = computed(() => {
  const types = new Set();
  products.value.forEach(product => {
    if (product && product.type) {
      types.add(product.type);
    }
  });
  return Array.from(types);
});

const handleDeleteProduct = (productId) => {
  products.value = products.value.filter(p => p.id !== productId);

  ordersData.value = ordersData.value.map(order => {
    if (order.products) {
      return {
        ...order,
        products: order.products.filter(p => p.id !== productId)
      };
    }
    return order;
  });
};

const filteredProducts = computed(() => {
  if (!selectedType.value) return products.value;
  return products.value.filter(
    product => product && product.type === selectedType.value
  );
});

const handleFilterChange = (type) => {
  selectedType.value = type;
};
</script>

<template>
  <div class="wrapper">
    <div class="products-header">
      <h1>Продукты</h1>
      <ProductFilter
        :productTypes="uniqueProductTypes"
        @filter-change="handleFilterChange"
      />
    </div>

    <div v-if="filteredProducts.length" class="product-list">
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :orders="ordersData"
        @delete-product="handleDeleteProduct"
      />
    </div>
    <div v-else class="no-products">
      Нет продуктов для отображения
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px;
}

.products-header {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.product-list {
  gap: 20px;
  margin-top: 20px;
}

.no-products {
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  color: #666;
  border: 1px dashed #ddd;
  border-radius: 4px;
}
</style>