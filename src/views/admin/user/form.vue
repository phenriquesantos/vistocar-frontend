<script>
import axios from '@/plugins/axios';
import adminPanel from '@/components/admin/panel.vue';

export default {
  components: {
    'admin-panel': adminPanel,
  },

  async created(){
    if(localStorage.user){
      this.user = JSON.parse(localStorage.user);
    }

    if(this.$route.params.id){
      this.userId = this.$route.params.id;

      await this.getUser();
    }

  },

  data(){
    return {
      userId: undefined,
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      user: undefined
    }
  },

  methods: {
    async getUser(){
      try{
        const { data } = await axios({
          url: `/user/${this.userId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          }
        });

        if(data){
          this.firstName = data.first_name;
          this.lastName = data.last_name;
          this.role = data.role;
          this.email = data.email;
        }
      }catch(e){
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async postUser(){
      try{
        const { data } = await axios({
          method: 'POST',
          headers:{
            // 'Authorization': `Bearer ${this.user.jwt}`
          },
          url: '/user',
          data: {
            'first_name': this.firstName,
            'last_name': this.lastName,
            'email': this.email,
            'role': this.role,
            'active': true,
            'password': this.password,
          }
        });

        if(data){
          this.$router.push('/admin/user/list');
        }
      }catch(e){
        console.log(`ERROR: ${e.code} - ${e.message}`);
      }
    },

    async putUser(){
      try{
        const body = {
          'first_name': this.firstName,
          'last_name': this.lastName,
          'email': this.email,
          'role': this.role,
          'active': true,
          'password': this.password,
        }

        if(body.password == ''){
          body.password = undefined;
        }

        await axios({
          method: 'PUT',
          url: `/user/${this.userId}`,
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          },
          data: body
        });

        this.$router.push('/admin/user/list');
      }catch(e){
        console.log(`ERROR: ${e.code} - ${e.message}`);
      }
    },

    async sendForm(event){
      event.preventDefault();
      if(this.userId){
        await this.putUser();
      }else{
        await this.postUser();
      }
    }
  },
}
</script>

<template>
    <admin-panel>
      <form class="form-admin" v-on:submit="sendForm($event)">
        <h1 class="form-admin__title">Novo Usuário</h1>

        <div class="row">
          <div class="col-md-5">
            <label for="txt_first-name">Nome</label>
            <input type="text" name="first-name" placeholder="Nome" id="txt_first-name" required v-model="firstName" />
          </div><!-- col md 4 -->
          <div class="col-md-7">
            <label for="txt_last-name">Sobrenome</label>
            <input type="text" name="last-name" placeholder="Sobrenome" id="txt_last-name" required v-model="lastName" />
          </div><!-- col md 7 -->
        </div><!-- row -->

        <div class="row">

          <div class="col-md-6">
            <label for="txt_email">E-mail</label>
            <input type="email" name="email" placeholder="E-mail" id="txt_email" required v-model="email" />
          </div><!-- col md 6 -->
          <div class="col-md-4">
            <label for="sel_rg-uf">Função</label>
            <select name="role" id="role" v-model="user.role">
              <option value="client">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div><!-- col md 1 -->
        </div><!-- row -->
        <div class="row">
          <div class="col-md-6">
            <label for="txt_pass">Senha</label>
            <input type="password" name="pass" placeholder="Senha" id="txt_pass" v-model="password" :required="!userId != ''" />
          </div><!-- col md 6 -->
          <div class="col-md-6">
            <label for="txt_r-pass">Repita a senha</label>
            <input type="password" name="pass" placeholder="Repita a senha" id="txt_r-pass" :required="!userId != ''" />
          </div>
        </div>

        <button class="form-admin__button" type="submit">Cadastrar</button>
      </form>
    </admin-panel>
</template>

<style lang="less" scoped>

.form-admin{
  background: white;
  padding: 20px 30px;
  border-radius: 5px;

  &::after{
    content: ' ';
    display: block;
    clear: both;
  }

  &__title{
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
  }

  label{
    text-transform: uppercase;
    display: block;
    margin-bottom: 10px;
  }

  &__content-editor{
    margin-top: 10px;
    margin-bottom: 20px;
  }

  input, select{
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ddd;
    display: block;
    width: 100%;
  }

  &__button{
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
</style>
