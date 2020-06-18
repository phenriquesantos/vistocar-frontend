<script>
import adminPanel from '@/components/admin/panel.vue';
import axios from '../../../plugins/axios'

export default {
  components: {
    'admin-panel': adminPanel
  },

  async created(){
    try{
      if(localStorage.user){
        this.user = JSON.parse(localStorage.user);
        await this.getSchedulingList();
      }
    }catch(e){
      console.log(`ERROR ${e.code} - ${e.message}`);
    }
  },

  data(){
    return{
      scheduling: undefined,
      schedulings: []
    }
  },

  methods: {
    async getSchedulingList(){
      try{
        let clientId = undefined;

        if(this.user.role == 'client'){
          clientId = this.user.clientId;
        }

        const { data } = await axios({
          url: '/schedule',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          },
          params: {
            'client_id': clientId
          }
        });

        if(data){
          // console.log(data);
          this.schedulings = data;
        }
      }catch(e){
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    }
  }
}
</script>

<template>
  <admin-panel class="list">
    <!-- <header class="list__saerch">

    </header> -->
    <div class="list__content">
      <div class="list__content__button">
        <router-link to="/admin/scheduling/new">Cadastrar Agendamento</router-link>
      </div>

      <table class="list__content__table" v-if="schedulings.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do cliente</th>
            <th>ID do cliente</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(scheduling, i) in schedulings"  v-bind:key="i">
            <td>{{ scheduling.id }}</td>
            <td>{{ scheduling.client.first_name }}</td>
            <td>{{ scheduling.client_id }}</td>
            <td>{{ scheduling.date }}</td>
            <td>{{ scheduling.time }}</td>
            <td class="list__content__table__buttons">
              <router-link
                v-bind:to="`/admin/scheduling/edit/${scheduling.id}`"
                class="list__content__table__buttons__item list__content__table__buttons__item--primary"
              >
                Editar
              </router-link>
              <router-link
                v-bind:to="`/admin/scheduling/delete/${scheduling.id}`"
                class="list__content__table__buttons__item list__content__table__buttons__item--danger"
              >
                Excluir
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="list__content__not-found" v-else>Nenhum registro encontrado</p>
    </div>
  </admin-panel>
</template>

<style lang="less" scoped>
.list{
  // background: white;
  &__content{
    background: white;
    padding: 20px;
    border-radius: 3px;

    &__button{
      display: flex;
      justify-content: right;
      align-items: center;
      padding: 20px 0;
      margin-bottom: 20px;

      a{
        text-transform: uppercase;
        text-decoration: none;
        display: inline-block;
        padding: 10px 20px;
        border: 2px solid #066395;
        color: #066395;
        font-weight: bold;
        border-radius: 3px;
        transition: all .2s;

        &:hover{
          background:#066395;
          color: white;
        }
      }
    }

    &__table{
      width: 100%;
      thead{
        th{
          background: #ddd;
          padding: 10px 5px;
          border-bottom: 1px solid #666;
          text-transform: uppercase;
        }
      }

      tbody{
        td{
          padding: 10px 5px;
          text-align: center;
        }
      }

      &__buttons{
        display: flex;
        justify-content: center;

        &__item{
          display: block;
          margin-right: 10px;
          padding: 7px 5px;
          border-radius: 2px;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 14px;

          &--primary{
            background:#066395;
            color: white;
          }

          &--danger{
            color: white;
            background: #d92626;
          }
        }
      }
    }

    &__not-found{
      text-transform: uppercase;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
