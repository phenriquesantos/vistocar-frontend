<script>
import adminSidebar from './sidebar.vue';
export default {
  components: {
    'admin-sidebar': adminSidebar
  }
}
</script>

<template>
  <div class="panel">
    <div class="panel__nav">
      <admin-sidebar class="panel__nav__item" />
    </div>

    <div class="panel__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.panel{
  background: #d7d7d7;
  position: relative;

  &__nav{
    width: 17%;
    // background: #09f;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;

    &__item{
      height: 100vh;
    }
  }

  &__content{
    // background: green;
    width: 80%;
    margin-left: 20%;
    height: 100vh;
    padding: 50px 30px;
  }
}
</style>