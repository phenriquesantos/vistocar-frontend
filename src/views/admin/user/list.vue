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
        await this.getUserList();
      }
    }catch(e){
      console.log(`ERROR ${e.code} - ${e.message}`);
    }
  },

  data(){
    return{
      user: undefined,
      users: []
    }
  },

  methods: {
    async getUserList(){
      try{
        const { data } = await axios({
          url: '/user',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          }
        });

        if(data){
          // console.log(data);
          this.users = data;
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
        <router-link to="/admin/user/new">Cadastrar Usuário</router-link>
      </div>

      <table class="list__content__table" v-if="users.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users"  v-bind:key="i">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="list__content__table__buttons">
              <router-link v-bind:to="`/admin/user/edit/${user.id}`" class="list__content__table__buttons__item list__content__table__buttons__item--primary">Editar</router-link>
              <router-link v-bind:to="`/admin/user/delete/${user.id}`" class="list__content__table__buttons__item list__content__table__buttons__item--danger">Excluir</router-link>
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
