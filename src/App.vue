<script setup>
import { RouterView } from 'vue-router';
import Logo from './components/svg/Logo.vue';
import TopMenu from './components/TopMenu.vue';
import Navigation from './components/Layouts/Navigation.vue';

</script>

<template>
  <header>
    <div class="header">
      <div class="header-left">
        <div class="header-logo">
          <Logo />
        </div>

        <input type="text" placeholder="Поиск">
      </div>

      <TopMenu />
    </div>
  </header>

  <div class="content-wrapper">
    <Navigation />

    <main class="main">
      <Transition name="router-view" mode="out-in">
        <RouterView />
      </Transition>
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  margin: 0 auto;
  justify-content: space-between;
  width: 80%;
  display: flex;
  align-items: center;
  padding: 20px;

  &-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &-left {
    display: flex;
    align-items: center;
    gap: 100px;
  }
}

.content-wrapper {
  display: flex;
}

input {
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  background-color: #f5f8fa;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #263238;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #263238;
    opacity: 1;
  }


  &:focus {
    border-color: #90a4ae;
  }
}
</style>