<script>
import axios from '@/plugins/axios';
import { VueEditor } from 'vue2-editor/dist/vue2-editor.core';
import adminPanel from '@/components/admin/panel.vue';

export default {
  components: {
    'admin-panel': adminPanel,
    'vue-editor': VueEditor
  },

  created(){
    if(!this.$route.query.vehicleId || !this.$route.query.clientId)
      this.$router.push('/admin');

    this.vehicleId = this.$route.query.vehicleId;
    this.clientId = this.$route.query.clientId;
  },
  
  data(){
    return {
      vehicleId: '',
      clientId: '',
      description: '',
    }
  },

  methods: {
    async sendForm(e){
      e.preventDefault();

      try{
        const { data } = await axios({
          url: '/report',
          method: 'POST',
          headers: {
            // 'Authorization': 'Bearer ${}'
          },
          data: {
            status: 1,
            vehicle_id: this.vehicleId,
            client_id: this.clientId,
            description: this.description,
          }
        });

        if(data){
          alert('Criado com sucesso');
        }
      }catch (e){
        console.log(e);
        alert('Erro ao completar a requisição');
      }
    }
  }
}
</script>

<template>
    <admin-panel>
      <form class="form-admin" v-on:submit="sendForm($event)">
        <h1 class="form-admin__title">Novo Laudo</h1>

        <label for="txt_description">Laudo</label>
        <div class="form-admin__content-editor">
          <vue-editor v-model="description" />
        </div>

        <button class="form-admin__button" type="submit">Cadastrar</button>
      </form>
    </admin-panel>
</template>

<style lang="less" scoped>
  
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

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
  }

  &__content-editor{
    margin-top: 10px;
    margin-bottom: 20px;
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