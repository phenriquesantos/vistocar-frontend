<script>
import { Fragment } from 'vue-fragment';

export default {
  components: {
    'fragment': Fragment
  },

  created(){
    const user = JSON.parse(localStorage.user);
    console.log(user);
    this.clientId = user. clientId
  },

  data(){
    return {
      clientId: 0
    }
  }
}
</script>

<template>
    <fragment>
      <li class="item">
        <router-link v-bind:to="`/admin/client/edit/${clientId}`">
        <v-icon class="item__icon">mdi-account</v-icon>
        Perfil
        </router-link>
      </li>
      <li class="item">
      <router-link to="/admin/scheduling/list">
        <v-icon class="item__icon">mdi-calendar-range</v-icon>Agendamentos
      </router-link>
    </li>
    <li class="item">
      <router-link to="/admin/report/list">
        <v-icon class="item__icon">mdi-file-document-outline</v-icon>Laudos
      </router-link>
    </li>
    </fragment>
</template>

<style lang="less" scoped>
.item{

  &__icon{
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 5px;
    color: white;
  }

  a{
    display: block;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    padding: 10px 0px 10px 20px;
    text-decoration: none;

    &:hover{
      color: #ffcc00;

      i{
      color: #ffcc00;
      }
    }
  }
}
</style>
