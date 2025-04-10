<script setup>
</script>

<template>
  <div class="wrapper">
    <div class="orders-header">
      <div class="orders-header_add">
        <span>
          +
        </span>
      </div>

      <h1>Приходы</h1>
    </div>

    <div class="orders-content">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.orders-header {
  display: flex;
  align-items: center;
  gap: 10px;

  &_add {
    border: 3px solid #64d65e;
    border-radius: 50%;
    font-size: 20px;
    color: #fff;
    width: 40px;
    height: 40px;
    background: #0ab900;
    transition: .3s ease-in-out;
    cursor: pointer;

    &:hover {
      background: #1ddb13;
      transition: .3s ease-in-out;
    }

    span {
      user-select: none;
      padding: 3px 0 0 0;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>