<script>
import axios from '@/plugins/axios';
import { TheMask } from 'vue-the-mask';

import pages from '@/components/common/pages.vue';
import error from '@/components/common/error.vue';

export default {
  created(){
    if(localStorage.user){
      delete localStorage.user;
    }
  },

  components: {
    'page-default': pages,
    'the-mask': TheMask,
    'error': error
  },

  data() {
    return {
      user:{
        id: '',
        firstName: '',
        lastName: '',
        cpf: '',
        rgNumber: '',
        rgUf: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: '',
      },
      error: ''
    }
  },

  methods: {
    async sendForm(e){
      e.preventDefault();

      if(this.user.password != this.user.repeatPassword){
        this.error = 'Senhas não coincidem';
      }else{
        try{
          await this.createUser();
          await this.createClient();
  
          this.$router.push('/')
        }catch(e){
          console.log(`ERROR ${e.code} - ${e.message}`);
          this.error = 'Erro ao completar requisição tente novamente mais tarde.';
        }
      }
    },

    async createUser(){
      const { data } = await axios({
        method: 'POST',
        url: '/user',
        data: {
          'first_name': this.user.firstName,
          'last_name': this.user.lastName,
          'email': this.user.email,
          'active': true,
          'role': 'client',
          'password': this.user.password,
        }
      });

      if(data){
        this.user.id = data.id;
      }
    },

    async createClient(){
      // console.log(this.user.id);
      await axios({
        method: 'POST',
        url: '/client',
        data: {
          'user_id': this.user.id,
          'first_name': this.user.firstName,
          'last_name': this.user.lastName,
          'cpf': this.user.cpf,
          'rg_number': this.user.rgNumber,
          'rg_uf': this.user.rgUf,
          'email': this.user.email,
          'phone': this.user.phone,
          'active': true,
        }
      });
    }
  }
}
</script>

<template>
  <page-default>

    <div class="register">
      <div class="container">
        <form action="" class="register__form" v-on:submit="sendForm($event)" >
          <div class="register__form__error" v-if="error != ''">
            <error
              v-bind:error="error"
            />
          </div>

          <h1 class="register__form__title">Cadastro de Usuário</h1>
          <div class="row">
            <div class="col-md-5">
              <label for="txt_first-name">Nome</label>
              <input type="text" name="first-name" placeholder="Nome" id="txt_first-name" required v-model="user.firstName" />
            </div><!-- col md 4 -->
            <div class="col-md-7">
              <label for="txt_last-name">Sobrenome</label>
              <input type="text" name="last-name" placeholder="Sobrenome" id="txt_last-name" required v-model="user.lastName"/>
            </div><!-- col md 7 -->
          </div><!-- row -->

          <div class="row">
            <div class="col-md-6">
              <label for="txt_phone">Celular</label>
              <the-mask type="text" name="phone" placeholder="Celular" id="txt_phone" required v-bind:mask="['(##) #.####-####']" v-model="user.phone" />
            </div><!-- col md 6 -->

            <div class="col-md-6">
              <label for="txt_email">E-mail</label>
              <input type="email" name="email" placeholder="E-mail" id="txt_email" required v-model="user.email" />
            </div><!-- col md 6 -->
          </div><!-- row -->

          <div class="row">
            <div class="col-md-6">
              <label for="txt_cpf">CPF</label>
              <the-mask type="text" name="cpf" placeholder="CPF" id="txt_cpf" required v-bind:mask="['###.###.###-##']" v-model="user.cpf" />
            </div><!-- col md 6 -->

            <div class="col-md-5">
              <label for="txt_rg-number">Número do RG</label>
              <the-mask type="text" name="rg-number" placeholder="Número do RG" id="txt_rg-number" v-bind:mask="['##.###.###-#']" v-model="user.rgNumber" />
            </div><!-- col md 5 -->
            <div class="col-md-1">
              <label for="sel_rg-uf">UF do RG</label>
              <select name="rg-uf" id="sel_rg-uf" v-model="user.rgUf">
                <option value="default" disabled selected>--</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div><!-- col md 1 -->
          </div><!-- row -->

          <div class="row">
            <div class="col-md-6">
              <label for="txt_pass">Senha</label>
              <input type="password" name="pass" placeholder="Senha" id="txt_pass" required v-model="user.password" />
            </div><!-- col md 6 -->
            <div class="col-md-6">
              <label for="txt_r-pass">Repita a senha</label>
              <input type="password" name="pass" placeholder="Repita a senha" id="txt_r-pass" required v-model="user.repeatPassword" />
            </div>
          </div>

          <button type="submit" class="register__form__button">Concluir Cadastro</button>
        </form>
      </div><!-- container -->
    </div><!-- register -->
  </page-default>
</template>

<style lang="less" scoped>
.register{
  min-height: 100vh;
  background: #ebebeb;
  padding: 100px 0;


  &__form{
    padding: 30px 20px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background: white;

    &::after{
      content: ' ';
      display: block;
      clear: both;
    }

    &__error{
      margin-bottom: 20px;
    }

    &__title{
      margin-bottom: 35px;
      font-weight: bold;
      text-align: center;
      font-size: 25px;
      text-transform: uppercase;
    }

    label{
      font-weight: bold;
      text-transform: uppercase;
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
    }

    input, select{
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
  }
}
</style>
