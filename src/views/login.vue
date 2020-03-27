<script>
import axios from '@/plugins/axios';

import error from '@/components/common/error.vue';
import pages from '@/components/common/pages.vue';

export default {
  components: {
    'page-default': pages,
    'error': error
  },

  async created(){
    if(localStorage.user){
      const user = JSON.parse(localStorage.user);

      console.log(user)
      try{
        const { data } = await axios({
          method: 'GET',
          url: `/user/${user.id_user}`,
          headers: {
            'Authorization': `Bearer ${user.jwt}`
          }
        });

        if(data){
          this.$router.push('/admin');
        }

      }catch(e){
        console.log(e);
      }
    }
  },

  data(){
    return {
      email: '',
      password: '',
      error: []
    }
  },
  
  head: {
    title:{
      inner: 'Vistocar - Login'
    }
  },

  methods: {
    async auth(e){
      e.preventDefault();
      try{
        const { data } = await axios({
          method: "POST",
          url: "/login",
          data: {
            email: this.email,
            password: this.password
          }
        });

        localStorage.user = JSON.stringify(data);
        this.$router.push('/admin')
      }catch(e) {
        if(e.message == 'Request failed with status code 400'){
          this.error.push({
            message: "E-mail e/ou senha invalido."
          });
        }else{
          console.log(e);
          this.error.push({
            message: "Erro ao fazer login. Tente novamente mais tarde!"
          })
        }
      }
    }
  },
  
  name: 'login',
}
</script>

<template>
  <page-default>
    <div class="login">
      <form class="login__form" v-on:submit="auth($event)">
        <figure class="login__form__image">
          <img src="../assets/images/vistocar-logo.png" alt="Grupo VistoCar" title="VistoCar" />
        </figure>

        <div class="login__form__error">
          <error
            v-bind:error="erro.message"
            v-bind:key="i"
            v-for="(erro, i) in error"
          />
        </div>

        <label for="txt_email">E-mail</label>
        <input type="email" name="email" id="txt_email" placeholder="E-mail" required v-model="email" />

        <label for="txt_pass">Senha</label>
        <input type="password" name="pass" placeholder="Senha" id="txt_pass" required v-model="password" />

        <a href="#">Esqueceu a senha ?</a>
        <button type="submit">Login</button>
      </form>
    </div>
  </page-default>
</template>

<style lang="less">
  .login{
    // height: 100vh;
    padding: 100px 0;
    background: #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;

    &__form{
      width: 350px;
      max-width: 100%;
      background: white;
      padding: 30px 20px;
      border-radius: 10px;
      border: 1px solid #ddd;

      &::after{
        content: ' ';
        display: block;
        clear: both;
      }
      
      &__image{
        text-align: center;
        margin-bottom: 20px;

        img{
          max-width: 100%;
        }
      }

      label{
        font-weight: bold;
        text-transform: uppercase;
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
      }

      input{
        display: block;
        width: 100%;
        padding: 5px 10px;
        border: 1px solid #ddd;
        margin-bottom: 20px;
        border-radius: 5px;
      }

      button{
        display: block;
        float: right;
        background: #4545a5;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 14px;

        &:hover{
          background: rgba(65,134,243,.7) radial-gradient(circle,transparent 1%,rgba(65,134,243,.7) 0) 50%/15000%;
        }
      }

      a{
        color: #0b5f98;
        text-decoration: none;
        display: block;
        padding: 10px 0;
        font-size: 14px;
        float: left;

        &:hover{
          color: #ffcc00;
          text-decoration: underline;
        }
      }
    }
  }
</style>}