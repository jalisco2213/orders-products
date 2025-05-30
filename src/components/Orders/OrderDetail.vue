<script setup>
import Trash from "@/components/svg/Trash.vue";
import DeletePopup from "@/components/DeletePopup.vue";
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
        <div class="product-container">
          <div class="product-img">
            <img src="/monitor.png" alt="">
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
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
}

.close-btn {
  border: none;
  position: absolute;
  top: 5px;
  right: 5px;
  background: #fff;
  border-radius: 50%;
  padding: 0 6px 2px;
  font-size: 1.5em;
  cursor: pointer;
  color: #666;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.line {
  height: 1px;
  background: #eee;
  margin: 15px 0;
}

.products-list {
  margin-top: 20px;
}

.product-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.product-container {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.product-img img {
  width: 50px;
  height: auto;
  object-fit: contain;
}

.product-info {
  flex: 1;
  min-width: 200px;
}

.product-title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1rem;
}

.product-serial, .product-price, .product-guarantee {
  margin-bottom: 3px;
  font-size: 0.9em;
  color: #555;
}

.product-remove {
  cursor: pointer;
  padding: 5px;
  flex-shrink: 0;
}

.product-remove:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .order-details {
    padding: 15px;
  }
  
  .product-container {
    gap: 10px;
  }
  
  .product-info {
    min-width: 150px;
  }
  
  .product-title {
    font-size: 0.9rem;
  }
  
  .product-serial, .product-price, .product-guarantee {
    font-size: 0.8em;
  }
}

@media (max-width: 480px) {
  .order-details {
    padding: 10px;
  }
  
  .product-item {
    padding: 10px;
  }
  
  .product-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .product-img {
    align-self: center;
  }
  
  .product-remove {
    align-self: flex-end;
    margin-top: -30px;
  }
  
  .product-info {
    width: 100%;
  }
}

@media (max-width: 320px) {
  .product-title {
    font-size: 0.8rem;
  }
  
  .product-serial, .product-price, .product-guarantee {
    font-size: 0.75em;
  }
}
</style>