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
      this.clientId = this.$route.params.id;

      await this.getClient();
    }

  },

  data(){
    return {
      clientId: undefined,
      firstName: '',
      lastName: '',
      cpf: '',
      rgNumber: '',
      rgUf: '',
      email: '',
      user: undefined
    }
  },

  methods: {
    async getClient(){
      try{
        const { data } = await axios({
          url: `/client/${this.clientId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          }
        });

        if(data){
          this.firstName = data.first_name;
          this.lastName = data.last_name;
          this.cpf = data.cpf;
          this.phone = data.phone;
          this.rgNumber = data.rg_number;
          this.rgUf = data.rg_uf;
          this.email = data.email;
        }
      }catch(e){
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async postClient(){
      try{
        const { data } = await axios({
          method: 'POST',
          headers:{
            // 'Authorization': `Bearer ${this.user.jwt}`
          },
          url: '/client',
          data: {
            'first_name': this.firstName,
            'last_name': this.lastName,
            'cpf': this.cpf,
            'rg_number': this.rgNumber,
            'rg_uf': this.rgUf,
            'email': this.email,
            'phone': this.phone,
            'active': true,
          }
        });

        if(data){
          this.$router.push('/admin/client/list');
        }
      }catch(e){
        console.log(`ERROR: ${e.code} - ${e.message}`);
      }
    },

    async putClient(){
      try{
        const body = {
          'first_name': this.firstName,
          'last_name': this.lastName,
          'cpf': this.cpf,
          'rg_number': this.rgNumber,
          'rg_uf': this.rgUf,
          'email': this.email,
          'phone': this.phone,
          'active': true,
        }

        await axios({
          method: 'PUT',
          url: `/client/${this.clientId}`,
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          },
          data: body
        });

        this.$router.push('/admin/client/list');
      }catch(e){
        console.log(`ERROR: ${e.code} - ${e.message}`);
      }
    },

    async sendForm(event){
      event.preventDefault();
      if(this.clientId){
        await this.putClient();
      }else{
        await this.postClient();
      }
    }
  },
}
</script>

<template>
    <admin-panel>
      <form class="form-admin" v-on:submit="sendForm($event)">
        <h1 class="form-admin__title">Novo Cliente</h1>

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
            <label for="txt_phone">Celular</label>
            <input type="text" name="phone" placeholder="Celular" id="txt_phone" v-model="phone" />
          </div><!-- col md 6 -->

          <div class="col-md-6">
            <label for="txt_email">E-mail</label>
            <input type="email" name="email" placeholder="E-mail" id="txt_email" required v-model="email" />
          </div><!-- col md 6 -->
        </div><!-- row -->

        <div class="row">
          <div class="col-md-6">
            <label for="txt_cpf">CPF</label>
            <input type="text" name="cpf" placeholder="CPF" id="txt_cpf" required v-model="cpf" />
          </div><!-- col md 6 -->

          <div class="col-md-4">
            <label for="txt_rg-number">Número do RG</label>
            <input type="text" name="rg-number" placeholder="Número do RG" id="txt_rg-number" v-model="rgNumber" />
          </div><!-- col md 5 -->
          <div class="col-md-2">
            <label for="sel_rg-uf">UF do RG</label>
            <select name="rg-uf" id="sel_rg-uf" v-model="rgUf">
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
