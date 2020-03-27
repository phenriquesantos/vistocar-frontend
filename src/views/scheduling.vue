<script>
// import authVerify from '@/functions/auth-verify';
// import axios from '@/plugins/axios';

import page from '@/components/common/pages.vue';


export default {

  // async created(){
  //   try{

  //   }catch(e){
  //     this.$router.push('/login')
  //   }
  // },
  
  components: {
    'page-default': page
  }
}
</script>

<template>
  <page-default>

    <div class="scheduling">
      <div class="container">
        <form class="scheduling__form">
          <!-- <figure class="scheduling__form__logo">
            <img src="../assets/images/vistocar-logo.png" title="Vistocar" alt="Vistocar" />
          </figure> -->
          <h1 class="scheduling__form__title">Agendamento de vistoria</h1>
          <fieldset>
            <legend>Dados do Veículo</legend>
            <div class="row">
              <div class="col-6">
                <label for="txt_brand">Marca</label>
                <select name="brand" id="txt_brand">
                  <option value="deafult" disabled selected>---Selecionar---</option>
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
                <input type="text" name="model" id="txt_model" placeholder="Modelo do veículo" />
              </div><!-- col 6 -->
            </div><!-- row -->

            <div class="row">
              <div class="col-6">
                <label for="txt_board">Placa</label>
                <input type="text" name="board" id="txt_board" placeholder="Placa do veículo" />
              </div>
              <div class="col-6">
                <label for="txt_year">Ano</label>
                <input type="text" name="year" id="txt_year" placeholder="Ano"/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Agendamento</legend>

            <div class="row">
              <div class="col-6">
                <label for="txt_date">Data</label>
                <input type="text" id="txt_date" placeholder="11/12/2020">
              </div><!-- col 6 -->
              <div class="col-6">
                <label for="txt_hour">Horario</label>
                <input type="text" id="txt_hour" placeholder="11:00" />
              </div>
            </div><!-- row -->
          </fieldset>
          <button type="submit">Agendar</button>
        </form>
      </div>
    </div>
  </page-default>
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