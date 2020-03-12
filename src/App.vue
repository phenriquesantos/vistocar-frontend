<script>
import header from './components/common/header.vue';
import footer from './components/common/footer.vue';

export default {
  components: {
    'header-default': header,
    'footer-default': footer
  },

  name: 'App',
};
</script>

<template>
  <div id="app">
    <header-default />
    <router-view></router-view>
    <footer-default />
  </div>
</template>

<style>
@import './assets/css/reset.css';
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,700i&display=swap');

html, body, input, button{
  font-family: 'Lato', sans-serif;
}
</style>
