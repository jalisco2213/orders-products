<script setup>
import { ref } from 'vue'

const props = defineProps({
  productTypes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filter-change'])

const selectedType = ref('')

const emitFilterChange = () => {
  emit('filter-change', selectedType.value)
}
</script>

<template>
  <div class="filter-container">
    <label for="product-type-filter" class="filter">Тип:</label>
    <select 
      id="product-type-filter" 
      v-model="selectedType" 
      @change="emitFilterChange"
    >
      <option value="">Все типы</option>
      <option 
        v-for="type in productTypes" 
        :key="type" 
        :value="type"
      >
        {{ type }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.filter {
  font-weight: 100;
}

select {
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>