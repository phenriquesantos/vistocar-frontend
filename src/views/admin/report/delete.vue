<script>
import axios from "@/plugins/axios";
export default {
  async created() {
    this.reportId = this.$route.params.id;

    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
      await this.deleteReport();
    }
  },

  data() {
    return {
      user: undefined,
      reportId: undefined
    };
  },

  methods: {
    async deleteReport() {
      try {
        await axios({
          url: `/report/${this.clientId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${this.user.jwt}`
          }
        });

        alert("Laudo deletado com sucesso");

        this.$router.push("/admin/report/list");
      } catch (e) {
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    }
  }
};
</script>

<template>
  <div class="admin-delete"></div>
</template>