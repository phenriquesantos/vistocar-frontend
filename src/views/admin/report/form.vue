<script>
import axios from "@/plugins/axios";
import { VueEditor } from "vue2-editor/dist/vue2-editor.core";
import adminPanel from "@/components/admin/panel.vue";

export default {
  components: {
    "admin-panel": adminPanel,
    "vue-editor": VueEditor
  },

  async created() {
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }

    this.vehicleId = this.$route.query.vehicleId || 0;
    this.clientId = this.$route.query.clientId || 0;

    if (this.$route.params.id) {
      this.reportId = this.$route.params.id;

      await this.getReport();
    }
  },

  data() {
    return {
      vehicleId: "",
      clientId: "",
      description: "",
      status: "",
      user: undefined,
      reportId: ""
    };
  },

  methods: {
    async getReport() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `/report/${this.reportId}`,
          headers: {
            Authorization: `Bearer ${this.user.jwt}`
          }
        });

        if (data) {
          this.clientId = data.client_id;
          this.vehicleId = data.vehicle_id;
          this.status = data.status;
          this.description = data.description;
        }
      } catch (e) {
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async postReport() {
      try {
        const { data } = await axios({
          url: "/report",
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.user.jwt}`
          },
          data: {
            status: this.status,
            vehicle_id: this.vehicleId,
            client_id: this.clientId,
            description: this.description
          }
        });

        if (data) {
          this.$router.push("/admin/report/list");
        }
      } catch (e) {
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async putReport() {
      try {
        await axios({
          url: `/report/${this.reportId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.user.jwt}`
          },
          data: {
            status: this.status,
            vehicle_id: this.vehicleId,
            client_id: this.clientId,
            description: this.description
          }
        });

        this.$router.push("/admin/report/list");
      } catch (e) {
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async sendForm(e) {
      e.preventDefault();
      if (this.reportId == "") {
        await this.postReport();
      } else {
        await this.putReport();
      }
    }
  }
};
</script>

<template>
  <admin-panel>
    <form class="form-admin" v-on:submit="sendForm($event)">
      <h1 class="form-admin__title">Novo Laudo</h1>

      <div class="row">
        <div class="col-md-6">
          <label for="txt_client-id">ID do cliente</label>
          <input
            type="number"
            name
            id="txt_client-id"
            placeholder="Id do Cliente"
            required
            v-model="clientId"
          />
        </div>
        <div class="col-md-6">
          <label for="txt_vehicle-id">ID do Veiculo</label>
          <input
            type="number"
            name
            id="txt_vehicle-id"
            placeholder="ID do cliente"
            required
            v-model="vehicleId"
          />
        </div>
      </div>

      <label for="txt_description">Laudo</label>
      <div class="form-admin__content-editor">
        <vue-editor v-model="description" />
      </div>

      <div class="row">
        <div class="col-md-6">
          <label for="sel_status">Status</label>
          <select name="" id="sel_status" v-model="status">
            <option value="Aprovado">Aprovado</option>
            <option value="Reprovado">Reprovado</option>
          </select>
        </div>
      </div>

      <button class="form-admin__button" type="submit">Cadastrar</button>
    </form>
  </admin-panel>
</template>

<style lang="less" scoped>
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";

.form-admin {
  background: white;
  padding: 20px 30px;
  border-radius: 5px;

  &::after {
    content: " ";
    display: block;
    clear: both;
  }

  &__title {
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
  }

  label {
    text-transform: uppercase;
    margin-bottom: 10px;
    display: block;
  }

  input,
  select {
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ddd;
    display: block;
    width: 100%;
  }

  &__content-editor {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  &__button {
    display: block;
    float: right;
    background: #4545a5;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;

    &:hover {
      background: rgba(65, 134, 243, 0.7)
        radial-gradient(circle, transparent 1%, rgba(65, 134, 243, 0.7) 0) 50%/15000%;
    }
  }

  a {
    color: #0b5f98;
    text-decoration: none;
    display: block;
    padding: 10px 0;
    font-size: 14px;
    float: left;

    &:hover {
      color: #ffcc00;
      text-decoration: underline;
    }
  }
}
</style>