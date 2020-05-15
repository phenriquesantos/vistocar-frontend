<script>
import axios from '@/plugins/axios';

import adminSidebar from './sidebar/sidebar.vue';
export default {

  async created(){
    if(localStorage.user){
      const user = JSON.parse(localStorage.user);
      try{
        const { data } = await axios({
          method: 'GET',
          url: `/user/${user.id_user}`,
          headers: {
            'Authorization': `Bearer ${user.jwt}`
          }
        });

        this.user = data;

        if(this.user.role == 'role'){
          this.isAdmin = true;
        }
      }catch(e){
        delete localStorage.user;
        this.$router.push('/login');
      }
    }
  },

  components: {
    'admin-sidebar': adminSidebar
  },

  data(){
    return {
      user: undefined,
      isAdmin: false
    }
  },

  methods: {
    logout(){
      delete localStorage.user;
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <div class="panel">
    <div class="panel__nav">
      <admin-sidebar class="panel__nav__item" v-bind:isAdmin="isAdmin" v-on:logout="logout" />
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