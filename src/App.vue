<script setup>
import {RouterView} from 'vue-router';
import Logo from './components/svg/Logo.vue';
import TopMenu from './components/TopMenu.vue';
import Navigation from '@/Layouts/Navigation.vue';

</script>

<template>
  <header>
    <div class="header">
      <div class="header-left">
        <div class="header-logo">
          <a href="/">
            <Logo/>
          </a>
        </div>

        <input type="text" placeholder="Поиск">
      </div>

      <TopMenu/>
    </div>
  </header>

  <div class="content-wrapper">
    <Navigation/>

    <main class="main">
      <Transition name="router-view" mode="out-in">
        <RouterView/>
      </Transition>
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header {
  margin: 0 auto;
  width: 80%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  &-logo {
    a {
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        width: 40px;
        height: auto;

        @media (max-width: 480px) {
          width: 30px;
        }
      }
    }
  }

  &-left {
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }
}

input {
  width: 300px;
  max-width: 100%;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 5px 0;
  }
}

.content-wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.main {
  flex: 1;
  padding: 20px;

  @media(max-width: 768px) {
    padding: 5px;
  }
}
</style>