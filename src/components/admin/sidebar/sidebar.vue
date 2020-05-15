<script>

import itensAdmin from './itens-admin.vue';
import itensClient from './itens-client.vue';

export default {
  components: {
    'itens-admin': itensAdmin,
    'itens-client': itensClient
  },

  props: {
    isAdmin: { type: Boolean, required: true, default: false }
  },

  methods: {
    emitLogout(){
      this.$emit('logout');
    }
  }
}
</script>

<template>
  <aside class="sidebar">
    <figure class="sidebar__logo">
      <img src="../../../assets/images/vistocar-logo.png" alt="Vistocar" title="Vistocar" class="sidebar__logo__item">
    </figure>
    <ul class="sidebar__list">
      <li class="sidebar__list__item">
        <router-link to="/admin">
          <v-icon class="sidebar__list__item__icon">mdi-home</v-icon>
          Home
        </router-link>
      </li><!-- side bar list item -->

      <itens-admin v-if="isAdmin" />
      <itens-client v-else />

      <li class="sidebar__list__item">
        <router-link to="/admin/client/list">
          <v-icon class="sidebar__list__item__icon">mdi-account</v-icon>
          Clientes
        </router-link>
      </li>
      <li class="sidebar__list__item">
        <router-link to="/admin/user/list">
          <v-icon class="sidebar__list__item__icon">mdi-account</v-icon>
          Usuários
        </router-link>
      </li>
      <li class="sidebar__list__item">
        <router-link to="/scheduling">
          <v-icon class="sidebar__list__item__icon">mdi-calendar-range</v-icon>
          Agendamento
        </router-link>
      </li>
      <li class="sidebar__list__item">
        <router-link to="/admin/scheduling/list">
          <v-icon class="sidebar__list__item__icon">mdi-calendar-range</v-icon>
          Agendamentos
        </router-link>
      </li>
      <li class="sidebar__list__item">
        <a href="#">
          <v-icon class="sidebar__list__item__icon">mdi-file-document-outline</v-icon>
          Laudos
        </a>
      </li>
      <li class="sidebar__list__item">
        <a href="#" v-on:click="emitLogout">
        <v-icon class="sidebar__list__item__icon">mdi-exit-to-app</v-icon>
          Sair
        </a>
      </li>
    </ul>
  </aside>
</template>

<style lang="less" scoped>
.sidebar{
  background: #486285;

  &__logo{
    padding: 30px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #5d789c;

    &__item{
      max-width: 100%;
    }
  }

  &__list{
    &__item{

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
  }
}
</style>
