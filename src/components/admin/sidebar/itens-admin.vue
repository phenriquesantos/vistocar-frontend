<script>
import { Fragment } from "vue-fragment";

export default {
  components: {
    fragment: Fragment
  }
};
</script>

<template>
  <fragment>
    <li class="item">
      <router-link to="/admin/client/list">
        <v-icon class="item__icon">mdi-account</v-icon>Clientes
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
    <li class="item">
      <router-link to="/admin/user/list">
        <v-icon class="item__icon">mdi-account</v-icon>Usuarios
      </router-link>
    </li>
  </fragment>
</template>

<style lang="less" scoped>
.item {
  &__icon {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 5px;
    color: white;
  }

  a {
    display: block;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    padding: 10px 0px 10px 20px;
    text-decoration: none;

    &:hover {
      color: #ffcc00;

      i {
        color: #ffcc00;
      }
    }
  }
}
</style>