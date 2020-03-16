<script>
import header from './header';
import footer from './footer';
export default {
  components: {
    'header-default': header,
    'footer-default': footer,
  }
}
</script>

<template>
  <div class="">
    <header-default />
    <slot></slot>
    <footer-default />
  </div>
</template>
