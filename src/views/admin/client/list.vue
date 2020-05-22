<script>
import adminPanel from "@/components/admin/panel.vue";
import axios from "../../../plugins/axios";


export default {
  components: {
    "admin-panel": adminPanel,
  },

  async created() {
    try {
      if (localStorage.user) {
        this.user = JSON.parse(localStorage.user);

        if(this.user.role != 'client'){
          await this.getClientList();
        }else{
          await this.getClient();
        }
      }
    } catch (e) {
      console.log(`ERROR ${e.code} - ${e.message}`);
    }
  },

  data() {
    return {
      user: undefined,
      clients: []
    };
  },

  methods: {
    async getClientList() {
      try {
        const { data } = await axios({
          url: "/client",
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.user.jwt}`
          }
        });

        if (data) {
          // console.log(data);
          this.clients = data;
        }
      } catch (e) {
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },
    async getClient() {
      try {
        const { data } = await axios({
          url: `/client/${this.user.clientId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.user.jwt}`
          }
        });

        if (data) {
          this.clients = [{
            id: data.id,
            name: data.first_name,
            email: data.email
          }];
        }
      } catch (e) {
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    }
  }
};
</script>

<template>
  <admin-panel class="list">
    <!-- <header class="list__saerch">

    </header>-->
    <div class="list__content">
      <div class="list__content__button">
        <router-link to="/admin/client/new">Cadastrar Cliente</router-link>
      </div>

      <table class="list__content__table" v-if="clients.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, i) in clients" v-bind:key="i">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td class="list__content__table__buttons">
              <router-link
                v-bind:to="`/admin/client/edit/${client.id}`"
                class="list__content__table__buttons__item list__content__table__buttons__item--primary"
              >Editar</router-link>
              <router-link
                v-bind:to="`/admin/client/delete/${client.id}`"
                class="list__content__table__buttons__item list__content__table__buttons__item--danger"
              >Excluir</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="list__content__not-found" v-else>Nenhum registro encontrado</p>
    </div>
  </admin-panel>
</template>

<style lang="less" scoped>
.list {
  // background: white;
  &__content {
    background: white;
    padding: 20px;
    border-radius: 3px;

    &__button {
      display: flex;
      justify-content: right;
      align-items: center;
      padding: 20px 0;
      margin-bottom: 20px;

      a {
        text-transform: uppercase;
        text-decoration: none;
        display: inline-block;
        padding: 10px 20px;
        border: 2px solid #066395;
        color: #066395;
        font-weight: bold;
        border-radius: 3px;
        transition: all 0.2s;

        &:hover {
          background: #066395;
          color: white;
        }
      }
    }

    &__table {
      width: 100%;
      thead {
        th {
          background: #ddd;
          padding: 10px 5px;
          border-bottom: 1px solid #666;
          text-transform: uppercase;
        }
      }

      tbody {
        td {
          padding: 10px 5px;
          text-align: center;
        }
      }

      &__buttons {
        display: flex;
        justify-content: center;

        &__item {
          display: block;
          margin-right: 10px;
          padding: 7px 5px;
          border-radius: 2px;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 14px;

          &--primary {
            background: #066395;
            color: white;
          }

          &--danger {
            color: white;
            background: #d92626;
          }
        }
      }
    }

    &__not-found {
      text-transform: uppercase;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>