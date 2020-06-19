<script>
import adminPanel from '@/components/admin/panel.vue';
import axios from '../../../plugins/axios'

export default {
  components: {
    'admin-panel': adminPanel
  },

  async created(){
    try{

      this.reportId = Number(this.$route.params.id) || 0;

      if(localStorage.user){
        this.user = JSON.parse(localStorage.user);
        await this.getReportById();
      }
    }catch(e){
      console.log(`ERROR ${e.code} - ${e.message}`);
    }
  },

  data(){
    return{
      user: undefined,
      report: undefined,
      reportId: 0,
    }
  },

  methods: {
    async getReportById(){
      try{
        const { data } = await axios({
          url: `/report/${this.reportId}`,
          method: 'GET',
        }); 

        if(data){
          this.report = data;
        }
      }catch(e){
        console.log(`${e.code} - ${e.message}`);
      }
    }
  }
}
</script>

<template>
  <admin-panel class="list">
    <div class="report" v-if="report">
      <h1 class="report__title">Laudo</h1>

      <p><b>Veiculo</b>: {{ `${report.vehicle.model} - ${report.vehicle.board}` }}</p>
      <p>
        <b>Status:</b>
        {{ report.status }}
        <br>
      </p>
      <p><b>Descrição:</b> <br> <br></p>
      <p v-html="report.description"/>
    </div>
  </admin-panel>
</template>

<style lang="less" scoped>
.report{
  padding: 30px;
  background: white;

  &__title{
    margin-bottom: 20px;
    font-size: 25px;
    text-transform: uppercase;
  }

  p{
    margin-bottom: 10px;
  }
}

</style>