<script setup lang="ts">
import Settings from '../components/svg/Settings.vue';

</script>

<template>
  <aside>
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
</template>

<style lang="scss">
aside {
  width: 250px;
  height: 91vh;
  box-shadow: 15px 0 15px rgba(0, 0, 0, 0.1);
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
      transition: .5s ease;
    }
  }
}

nav {
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
}
</style>