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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1rem;
  padding: 0.5rem 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
}

.day {
  &::first-letter {
    text-transform: uppercase;
  }
}

.time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  word-break: break-word;

  svg {
    width: 1em;
    height: 1em;

    @media (max-width: 480px) {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
