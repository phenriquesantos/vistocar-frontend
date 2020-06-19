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
        await this.getReportList();
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

    </div>
  </admin-panel>
</template>

<style lang="less" scoped>
</style>