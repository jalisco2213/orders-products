<script setup>
import { computed, ref } from 'vue';
import ProductItem from '@/components/Products/ProductsItem.vue';
import ProductFilter from '@/components/Products/ProductsFilter.vue';
import { orders } from '@/data/orders';

const ordersData = orders();

const flattenProducts = (ordersArray) => {
  if (Array.prototype.flatMap) {
    return ordersArray.flatMap(order => order.products || []);
  }
  return ordersArray.reduce((acc, order) => {
    return acc.concat(order.products || []);
  }, []);
};

const allProducts = computed(() => {
  try {
    return flattenProducts(ordersData);
  } catch (error) {
    console.error('Error processing products:', error);
    return [];
  }
});

const uniqueProductTypes = computed(() => {
  try {
    const types = new Set();
    allProducts.value.forEach(product => {
      if (product && product.type) {
        types.add(product.type);
      }
    });
    return Array.from(types);
  } catch (error) {
    console.error('Error getting product types:', error);
    return [];
  }
});

const selectedType = ref(null);

const filteredProducts = computed(() => {
  try {
    if (!selectedType.value) return allProducts.value;
    return allProducts.value.filter(
      product => product && product.type === selectedType.value
    );
  } catch (error) {
    console.error('Error filtering products:', error);
    return [];
  }
});

const handleFilterChange = (type) => {
  selectedType.value = type;
};
</script>

<template>
  <div class="wrapper">

    <div class="products-header">
      <h1>Продукты</h1>

      <ProductFilter :productTypes="uniqueProductTypes" @filter-change="handleFilterChange" />
    </div>

    <div v-if="filteredProducts.length" class="product-list">
      <ProductItem v-for="product in filteredProducts" :key="product.id" :product="product" :orders="ordersData" />
    </div>
    <div v-else class="no-products">
      No products found
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
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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