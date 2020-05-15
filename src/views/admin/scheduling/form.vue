<script>
import axios from '@/plugins/axios';
import adminPanel from '@/components/admin/panel.vue';

export default {
  components: {
    'admin-panel': adminPanel,
  },

  async created(){
    if(localStorage.user){
      this.user = JSON.parse(localStorage.user);
    }

    if(this.$route.params.id){
      this.schedulingId = this.$route.params.id;

      await this.getScheduling();
    }

  },

  data(){
    return {
      schedulingId: undefined,
      date: '',
      time: '',
      client_id: '',
      scheduling: undefined,
      board: '',
      brand: '',
      model: '',
      year: '',
      error: []
    }
  },

  methods: {
    async getScheduling(){
      try{
        const { data } = await axios({
          url: `/schedule/${this.schedulingId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          }
        });

        if(data){
          this.status = data.status;
          this.created_at = data.created_at;
          this.date = data.date;
          this.time = data.time;
          this.client_id = data.client_id;
        }
      }catch(e){
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async postScheduling(){
      try{
        const { data } = await axios({
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${this.user.jwt}`
          },
          url: '/schedule',
          data: {
            'status': 'new',
            'created_at': Date.now(),
            'client_id': this.client_id,
            'date': this.date,
            'time': this.time,
            'vehicle_board': this.board,
            'vehicle_brand': this.brand,
            'vehicle_model': this.model,
            'vehicle_year': this.year
          }
        });

        if(data){
          this.$router.push('/admin/scheduling/list');
        }
      }catch(e){
        console.log(`ERROR: ${e.code} - ${e.message}`);
      }
    },

    async putScheduling(){
      try{
        const body = {
          'status': 'new',
          'created_at': Date.now(),
          'client_id': this.client_id,
          'date': this.date,
          'time': this.time,
          'vehicle_board': this.board,
          'vehicle_brand': this.brand,
          'vehicle_model': this.model,
          'vehicle_year': this.year
        }

        await axios({
          method: 'PUT',
          url: `/schedule/${this.schedulingId}`,
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          },
          data: body
        });

        this.$router.push('/admin/scheduling/list');
      }catch(e){
        console.log(`ERROR: ${e.code} - ${e.message}`);
      }
    },

    async sendForm(event){
      event.preventDefault();
      if(this.schedulingId){
        await this.putScheduling();
      }else{
        await this.postScheduling();
      }
    }
  },
}
</script>

<template>
    <admin-panel>
      <form class="scheduling__form" v-on:submit="sendForm($event)">
        <!-- <figure class="scheduling__form__logo">
          <img src="../assets/images/vistocar-logo.png" title="Vistocar" alt="Vistocar" />
        </figure> -->
        <h1 class="scheduling__form__title">Agendamento de vistoria</h1>
        <fieldset>
          <legend>Dados do Veículo</legend>
          <div class="row">
            <div class="col-6">
              <label for="txt_board">Cliente</label>
              <input type="text" name="client_id" id="client_id" placeholder="ID do cliente" required v-model="board" />
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label for="txt_brand">Marca</label>
              <select name="brand" id="txt_brand" required v-model="brand">
                <option value="agrale">Agrale</option>
                <option value="astonmartin">Astonmartin</option>
                <option value="audi">Audi</option>
                <option value="bentley">Bentley</option>
                <option value="bmw">BMW</option>
                <option value="byd">BYD</option>
                <option value="caoachery">Caoachery</option>
                <option value="changan">Changan</option>
                <option value="chevrolet">Chevrolet</option>
                <option value="chrysler">Chrysler</option>
                <option value="citroen">Citroen</option>
                <option value="dodge">Dodge</option>
                <option value="dongfeng">Dongfeng</option>
                <option value="effa">Effa</option>
                <option value="ferrari">Ferrari</option>
                <option value="fiat">Fiat</option>
                <option value="ford">Ford</option>
                <option value="foton">Foton</option>
                <option value="geely">Geely</option>
                <option value="hafei">Hafei</option>
                <option value="honda">Honda</option>
                <option value="hyundai">Hyundai</option>
                <option value="iveco">Iveco</option>
                <option value="jac">JAC</option>
                <option value="jaguar">Jaguar</option>
                <option value="jeep">Jeep</option>
                <option value="jinbei">Jinbei</option>
                <option value="kia">KIA</option>
                <option value="lamborghini">Lamborghini</option>
                <option value="landrover">Land Rover</option>
                <option value="lexus">Lexus</option>
                <option value="lifan">Lifan</option>
                <option value="maserati">Maserati</option>
                <option value="mclaren">McLaren</option>
                <option value="mercedes-amg">Mercedes-AMG</option>
                <option value="mercedes-benz">Mercedes-Benz</option>
                <option value="mini">Mini</option>
                <option value="mitsubishi">Mitsubishi</option>
                <option value="nissan">Nissan</option>
                <option value="peugeot">Peugeot</option>
                <option value="porsche">Porsche</option>
                <option value="ram">RAM</option>
                <option value="rely">Rely</option>
                <option value="renault">Renault</option>
                <option value="rolls-royce">Rolls-Royce</option>
                <option value="shineray">Shineray</option>
                <option value="smart">Smart</option>
                <option value="ssangYong">SsangYong</option>
                <option value="subaru">Subaru</option>
                <option value="suzuki">Suzuki</option>
                <option value="tac">TAC</option>
                <option value="toyota">Toyota</option>
                <option value="troller">Troller</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="volvo">Volvo</option>
              </select>
            </div><!-- col-6 -->
            <div class="col-6">
              <label for="txt_model">Modelo</label>
              <input type="text" name="model" id="txt_model" placeholder="Modelo do veículo" required v-model="model" />
            </div><!-- col 6 -->
          </div><!-- row -->

          <div class="row">
            <div class="col-6">
              <label for="txt_board">Placa</label>
              <input type="text" name="board" id="txt_board" placeholder="Placa do veículo" required v-model="board" />
            </div>
            <div class="col-6">
              <label for="txt_year">Ano</label>
              <input type="text" name="year" id="txt_year" placeholder="Ano" required v-model="year" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Agendamento</legend>

          <div class="row">
            <div class="col-6">
              <label for="txt_date">Data</label>
              <input type="text" id="txt_date" placeholder="11/12/2020" required v-model="date" />
            </div><!-- col 6 -->
            <div class="col-6">
              <label for="txt_hour">Horario</label>
              <input type="text" id="txt_hour" placeholder="11:00" required v-model="hour" />
            </div>
          </div><!-- row -->
        </fieldset>
        <button type="submit">Agendar</button>
      </form>
    </admin-panel>
</template>

<style lang="less" scoped>
  .scheduling{
    justify-content: center;
    align-items: center;
    background: #ebebeb;
    padding: 30px 0;

    &__form{
      padding: 40px 30px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 10px;

      &::after{
        content: ' ';
        display: block;
        clear: both;
      }

      &__logo{
        text-align: center;
        margin-bottom: 20px;

        img{
          max-height: 80px;
        }
      }

      &__title{
        text-transform: uppercase;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 40px;
      }

      label{
        font-weight: bold;
        text-transform: uppercase;
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
      }

      input, select{
        display: block;
        width: 100%;
        padding: 5px 10px;
        border: 1px solid #ddd;
        margin-bottom: 20px;
        border-radius: 5px;
      }

      legend{
        font-size: 16px;
        text-transform: uppercase;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        width: 100%;
        font-weight: bold;
        margin-bottom: 10px;
      }

      button{
        display: block;
        float: right;
        background: #4545a5;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 14px;
        margin-top: 30px;

        &:hover{
          background: rgba(65,134,243,.7) radial-gradient(circle,transparent 1%,rgba(65,134,243,.7) 0) 50%/15000%;
        }
      }
    }
  }
</style>
