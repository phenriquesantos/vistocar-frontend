{<script>
export default {
  head: {
    title:{
      inner: 'Vistocar - Login'
    }
  },
  name: 'login',
}
</script>

<template>
  <div class="login">
    <form class="login__form">
      <figure class="login__form__image">
        <img src="../assets/images/vistocar-logo.png" alt="Grupo VistoCar" title="VistoCar" />
      </figure>
      <label for="txt_login">Login</label>
      <input type="text" name="login" id="txt_login" placeholder="Login" required />

      <label for="txt_pass">Senha</label>
      <input type="password" name="pass" placeholder="Senha" id="txt_pass" />

      <a href="#">Esqueceu a senha ?</a>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style lang="less">
  .login{
    // height: 100vh;
    padding: 100px 0;
    background: #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;

    &__form{
      width: 350px;
      max-width: 100%;
      background: white;
      padding: 30px 20px;
      border-radius: 10px;
      border: 1px solid #ddd;

      &::after{
        content: ' ';
        display: block;
        clear: both;
      }
      
      &__image{
        text-align: center;
        margin-bottom: 20px;

        img{
          max-width: 100%;
        }
      }

      label{
        font-weight: bold;
        text-transform: uppercase;
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
      }

      input{
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

      a{
        color: #0b5f98;
        text-decoration: none;
        display: block;
        padding: 10px 0;
        font-size: 14px;
        float: left;

        &:hover{
          color: #ffcc00;
          text-decoration: underline;
        }
      }
    }
  }
</style>}