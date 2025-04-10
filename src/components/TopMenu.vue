<script setup>
import { ref, onMounted } from 'vue'
import Clock from './svg/Clock.vue'

const day = ref('')
const date = ref('')
const time = ref('')

const update = () => {
  const now = new Date()

  day.value = now.toLocaleDateString('ru-RU', { weekday: 'long' })
  date.value = now.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  time.value = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  update()
  setInterval(update, 1000)
})
</script>

<template>
  <div class="header-right">
    <p class="day">
      {{ day }}
    </p>

    <div class="time">
      {{ date }}

      <Clock />

      {{ time }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-right {
  font-weight: 500;
  user-select: none;
  cursor: default;
}

.day {
  &::first-letter {
    text-transform: uppercase;
  }
}

.time {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>