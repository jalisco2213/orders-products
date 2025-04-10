<script setup>
import Trash from "@/components/svg/Trash.vue";
import DeletePopup from "@/components/Orders/DeletePopup.vue";
import {ref} from 'vue';

const props = defineProps(['order']);
const emit = defineEmits(['close', 'delete-product']);

const localProducts = ref([...props.order.products]);
const showDeletePopup = ref(false);
const productToDelete = ref(null);

const confirmDeleteProduct = (product) => {
  productToDelete.value = product;
  showDeletePopup.value = true;
};

const cancelDelete = () => {
  showDeletePopup.value = false;
  productToDelete.value = null;
};

const confirmDelete = () => {
  if (productToDelete.value) {
    localProducts.value = localProducts.value.filter(product => product.id !== productToDelete.value.id);
    emit('delete-product', productToDelete.value.id);
    showDeletePopup.value = false;
    productToDelete.value = null;
  }
};
</script>

<template>
  <div v-if="order" class="order-details">
    <button class="close-btn" @click="$emit('close')">×</button>

    <h2>{{ order.name }}</h2>

    <div class="line"></div>

    <div class="products-list">
      <div v-for="product in localProducts" :key="product.id" class="product-item">
        <div style="display: flex; align-items: center; gap: 10px; justify-content: space-between">
          <div class="product-img">
            <img style="width: 50px" src="/monitor.png" alt="">
          </div>

          <div class="product-info">
            <div class="product-title">{{ product.title }}</div>
            <div class="product-serial">Серийный номер: {{ product.serialNumber }}</div>
            <div class="product-price">
              Цена:
              <span v-for="(price, index) in product.price" :key="index">
                {{ price.value }}{{ price.symbol }}
                <span v-if="index < product.price.length - 1"> / </span>
              </span>
            </div>
            <div class="product-guarantee">
              Гарантия: {{ product.guarantee.start }} - {{ product.guarantee.end }}
            </div>
          </div>

          <div class="product-remove" @click="confirmDeleteProduct(product)">
            <Trash/>
          </div>
        </div>
      </div>
    </div>

    <DeletePopup
        v-if="showDeletePopup"
        :itemName="productToDelete?.title"
        :itemImage="'/monitor.png'"
        :itemSerial="productToDelete?.serialNumber"
        @cancel="cancelDelete"
        @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.order-details {
  width: 100%;
  background: #fff;
  padding: 20px;
  position: relative;
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

.products-list {
  margin-top: 20px;
}

.product-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;
}

.product-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.product-serial, .product-price, .product-guarantee {
  margin-bottom: 3px;
  font-size: 0.9em;
  color: #555;
}

.product-remove {
  cursor: pointer;
  padding: 5px;
}

.product-remove:hover {
  opacity: 0.7;
}
</style>