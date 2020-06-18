<script>
import axios from '@/plugins/axios';
import adminPanel from '@/components/admin/panel.vue';
import { TheMask } from 'vue-the-mask';

export default {
  components: {
    'admin-panel': adminPanel,
    'the-mask': TheMask
  },

  async created(){
    if(localStorage.user){
      this.user = JSON.parse(localStorage.user);

      if(this.user.role == 'client'){
        this.client_id = this.user.clientId;
        this.listClient.push({
          id: this.user.clientId,
          name: this.user.first_name
        });
        await this.getVehicles();
      }else{
        this.clientIdEnable = false;
        await this.getClients();
      }
    }

    if(this.$route.params.id){
      this.schedulingId = this.$route.params.id;

      await this.getScheduling();
      await this.getVehicles();
      // await this.getAvaliableHours();
    }

  },

  data(){
    return {
      avaliableHours: [],
      schedulingId: undefined,
      date: '',
      time: '',
      client_id: '',
      clientIdEnable: true,
      scheduling: undefined,
      board: '',
      brand: '',
      model: '',
      year: '',
      error: [],
      vehicle_id: '0',
      user: undefined,
      listClient: [],
      vehicleList: [],
    }
  },

  methods: {
    changeVehicle(){
      if(this.vehicle_id == "0"){
        this.board = '';
        this.brand = '';
        this.model = '';
        this.year = '';
      }else{
        const vehicle = this.vehicleList.filter(vehicle => {
          if(vehicle.id == this.vehicle_id) return vehicle;
        })[0];

        this.board = vehicle.board;
        this.brand = vehicle.brand;
        this.model = vehicle.model;
        this.year = vehicle.year;
      }
    },

    async getClients(){
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
          this.listClient = data;
        }
      } catch (e) {
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async getScheduling(){
      try{
        const { data } = await axios({
          url: `/schedule/${this.schedulingId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.user.jwt}`
          }
        });

        console.log(data)

        if(data){
          this.status = data.status;
          this.created_at = data.created_at;
          this.date = data.date;
          this.time = data.time;
          this.client_id = data.client_id;
          this.board = data.vehicle.board;
          this.brand = data.vehicle.brand;
          this.model = data.vehicle.model;
          this.year = data.vehicle.year;
          this.vehicle_id = data.vehicle.id;
          this.avaliableHours = [data.time];
        }
      }catch(e){
        console.log(`ERROR ${e.code} - ${e.message}`);
      }
    },

    async getAvaliableHours() {
      try{
        const date = this.date.split('/').join('-');

        const { data } = await axios({
          url: `/available_times/${date}`,
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${this.user.jwt}`
          },
        });

        this.avaliableHours = data;
      }catch(e){
        console.log(`ERROR ${e.code} = ${e.message}`)
      }
    },

    async getVehicles(){
      try{
        const { data } = await axios({
          url: '/vehicle',
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${this.user.jwt}`
          },
          params: {
            'client_id': this.client_id
          }
        });

        this.vehicleList = data;
      }catch(e){
        console.log(`ERROR ${e.code} = ${e.message}`)
      }
    },

    async postScheduling(){
      try{
        const date = this.date.split('/').join('-');
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
            'date': date,
            'time': this.time,
            'vehicle_board': this.board,
            'vehicle_brand': this.brand,
            'vehicle_model': this.model,
            'vehicle_year': this.year,
            'vehicle_id': this.vehicle_id
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
        const date = this.date.split('/').join('-');

        const body = {
          'status': 'new',
          'created_at': Date.now(),
          'client_id': this.client_id,
          'date': date,
          'time': this.time,
          'vehicle_id': this.vehicle_id,
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

        <div class="row">
          <div class="col-6">
            <label for="sel_client">Cliente</label>
            <select name="client" id="sel_client" v-model="client_id" v-on:change="getVehicles()">
              <option
                v-for="(client, i) in listClient"
                v-bind:key="i"
                v-bind:value="client.id"
              >{{ client.name }}</option>
            </select>
          </div>
          <div class="col-6">
            <label for="sel_vehicle">Veículo</label>
            <select name="vehicle" id="sel_vehicle" v-model="vehicle_id" v-on:change="changeVehicle()">
              <option value="0">Novo</option>
              <option
                v-for="(vehicle, i) in vehicleList"
                v-bind:key="i"
                v-bind:value="vehicle.id"
              >{{ `${vehicle.model} - ${vehicle.board}` }}</option>
            </select>
          </div>
        </div>

        <fieldset>
          <legend>Dados do Veículo</legend>

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
              <the-mask type="text" name="board" id="txt_board" placeholder="Placa do veículo" required v-model="board" v-bind:mask="['SSS-####']" />
            </div>
            <div class="col-6">
              <label for="txt_year">Ano</label>
              <the-mask type="text" name="year" id="txt_year" placeholder="Ano" required v-model="year" v-bind:mask="['####']" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Agendamento</legend>

          <div class="row">
            <div class="col-6">
              <label for="txt_date">Data</label>
              <the-mask type="text" id="txt_date" placeholder="11/12/2020" required v-model="date" v-bind:mask="['##/##/####']" v-on:change.native="getAvaliableHours()" v-bind:masked="true" />
            </div><!-- col 6 -->
            <div class="col-6">
              <label for="sel_hour">Horario</label>
              <select name="" id="sel_hour" v-model="time">
                <option v-for="(hour, i) in avaliableHours" v-bind:key="i" v-bind:value="hour" >{{ hour }}</option>
              </select>
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
