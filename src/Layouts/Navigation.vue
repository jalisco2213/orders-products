<script setup lang="ts">
import { ref } from 'vue';
import Settings from '../components/svg/Settings.vue';
import BurgerMenu from '@/components/svg/BurgerMenu.vue';

const isOpen = ref(false);
</script>

<template>
  <div>
    <div class="menu-toggle" @click="isOpen = !isOpen">
      <BurgerMenu />
    </div>

    <aside :class="{ open: isOpen }">
      <div class="aside-content">
        <div class="aside-top">
          <div class="aside-photo">
            <img src="/avatar.png" alt="">
            <div class="aside-photo_settings">
              <Settings />
            </div>
          </div>
        </div>

        <nav>
          <li>
            <RouterLink to="/">Приход</RouterLink>
          </li>
          <li>
            <RouterLink to="/group">Группы</RouterLink>
          </li>
          <li>
            <RouterLink to="#">Продукты</RouterLink>
          </li>
          <li>
            <RouterLink to="#">Пользователи</RouterLink>
          </li>
          <li>
            <RouterLink to="#">Настройки</RouterLink>
          </li>
        </nav>
      </div>
    </aside>
  </div>
</template>


<style lang="scss">
aside {
  width: 250px;
  height: 91vh;
  box-shadow: 15px 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  background: #fff;
  position: static;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed;
    transform: translateX(-100%);

    &.open {
      transform: translateX(0);
    }
  }
}

.menu-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 15;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  svg {
    width: 30px;
    height: 30px;
  }
}

.aside-content {
  padding: 50px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.aside-photo {
  position: relative;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  &_settings {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 20px;
    width: 50px;
    height: 50px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .5s ease;

    &:hover {
      background: #eee;
    }
  }
}

nav {
  font-size: 20px;
  text-align: center;
  margin-top: 50px;

  li {
    margin-bottom: 20px;
    list-style: none;

    a {
      text-decoration: none;
      color: #333;

      &:hover {
        color: #007bff;
      }
    }
  }
}
</style>