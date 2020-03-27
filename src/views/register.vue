<script>
import pages from '@/components/common/pages.vue';
export default {
  components: {
    'page-default': pages
  }
}
</script>

<template>
  <page-default>

    <div class="register">
      <div class="container">
        <form action="" class="register__form">
        <h1 class="register__form__title">Cadastro</h1>
          <div class="row">
            <div class="col-md-5">
              <label for="txt_first-name">Nome</label>
              <input type="text" name="first-name" placeholder="Nome" id="txt_first-name" required />
            </div><!-- col md 4 -->
            <div class="col-md-7">
              <label for="txt_last-name">Sobrenome</label>
              <input type="text" name="last-name" placeholder="Sobrenome" id="txt_last-name" required />
            </div><!-- col md 7 -->
          </div><!-- row -->

          <div class="row">
            <div class="col-md-6">
              <label for="txt_phone">Celular</label>
              <input type="text" name="phone" placeholder="Celular" id="txt_phone" required />
            </div><!-- col md 6 -->

            <div class="col-md-6">
              <label for="txt_email">E-mail</label>
              <input type="email" name="email" placeholder="E-mail" id="txt_email" required />
            </div><!-- col md 6 -->
          </div><!-- row -->

          <div class="row">
            <div class="col-md-6">
              <label for="txt_cpf">CPF</label>
              <input type="text" name="cpf" placeholder="CPF" id="txt_cpf" required />
            </div><!-- col md 6 -->

            <div class="col-md-5">
              <label for="txt_rg-number">Número do RG</label>
              <input type="text" name="rg-number" placeholder="Número do RG" id="txt_rg-number" />
            </div><!-- col md 5 -->
            <div class="col-md-1">
              <label for="sel_rg-uf">UF do RG</label>
              <select name="rg-uf" id="sel_rg-uf">
                <option value="default" disabled selected>--</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div><!-- col md 1 -->
          </div><!-- row -->

          <div class="row">
            <div class="col-md-6">
              <label for="txt_pass">Senha</label>
              <input type="password" name="pass" placeholder="Senha" id="txt_pass" required />
            </div><!-- col md 6 -->
            <div class="col-md-6">
              <label for="txt_r-pass">Repita a senha</label>
              <input type="password" name="pass" placeholder="Repita a senha" id="txt_r-pass" required />
            </div>
          </div>

          <button type="submit" class="register__form__button">Concluir Cadastro</button>
        </form>
      </div><!-- container -->
    </div><!-- register -->
  </page-default>
</template>

<style lang="less" scoped>
.register{
  background: #ebebeb;
  padding: 100px 0;


  &__form{
    padding: 30px 20px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background: white;

    &::after{
      content: ' ';
      display: block;
      clear: both;
    }
    
    &__title{
      margin-bottom: 35px;
      font-weight: bold;
      text-align: center;
      font-size: 25px;
      text-transform: uppercase;
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

    button{
      display: block;
      float: right;
      background: #4545a5;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 14px;

      &:hover{
        background: rgba(65,134,243,.7) radial-gradient(circle,transparent 1%,rgba(65,134,243,.7) 0) 50%/15000%;
      }
    }
  }
}
</style>