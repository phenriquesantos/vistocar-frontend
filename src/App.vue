<script>
export default {
  name: 'App',
};
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
@import './assets/css/reset.css';
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,700i&display=swap');

html, body, input, button{
  font-family: 'Lato', sans-serif;
}
</style>
