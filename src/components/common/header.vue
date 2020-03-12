<script>
export default {
  
}
</script>

<template>
  <header class="top">
    <div class="top__bar">
      <div class="container">
        <ul class="top__bar__contacts">
          <li class="top__bar__contacts__item">
            <a href="mailto:vistocar@vistocar.com.br">vistocar@vistocar.com.br</a>
          </li>

          <li class="top__bar__contacts__item">
            <a href="tel:1122402222">
              (11) 2240-2222</a>
          </li>

          <li class="top__bar__contacts__item">
            <a href="tel:11943534802">(11) 94353-4802</a>
          </li>
        </ul>
      </div><!-- container -->
    </div><!-- top bar -->

    <div class="top__content">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <figure class="top__content__logo">
              <img src="../../assets/images/vistocar-logo.png" alt="vistocar" title="Vistocar" />
            </figure>

            <nav>
              <ul class="top__content__nav">
                <li class="top__content__nav__item">
                  <a href="#">Home</a>
                </li>
                <li class="top__content__nav__item">
                  <a href="#">Serviços</a>
                </li>
                <li class="top__content__nav__item">
                  <a href="#">O Grupo</a>
                </li>
                <li class="top__content__nav__item">
                  <a href="#">Links</a>
                </li>
                <li class="top__content__nav__item">
                  <a href="#">Unidades</a>
                </li>
                <li class="top__content__nav__item">
                  <a href="#">Informações</a>
                </li>
                <li class="top__content__nav__item">
                  <a href="#">Contato</a>
                </li>
                <li class="top__content__nav__item">
                  <router-link to="/login">Login</router-link>
                </li>
              </ul>
            </nav>
          </div><!-- col md 12 -->
        </div><!-- row -->
      </div><!-- container -->
    </div><!-- content -->
  </header>  
</template>

<style lang="less" scoped>
  .top{
    &__bar{
      padding: 10px 0;
      background-color: #000066;
      color: #fff;
      text-align: right;

      &__contacts{
        &__item{
          display: inline-block;
          margin-right: 10px;

          &:last-child{
            margin-right: 0;
          }

          a{
            color: white;
            font-weight: bold;
            text-decoration: none;

            &:hover{
              color: #ffcc00;
              text-decoration: underline;
            }
          }
        }
      }
    }

    &__content{
      padding: 20px 0;
      background-color: #fff;
      box-shadow: 2px 2px 7px #c1c1c1;

      &::after{
        content: ' ';
        display: block;
        clear: both;
      }

      &__logo{
        float: left;
      }

      nav{
        float: right;
      }

      &__nav{
        margin-top: 20px;

        &__item{
          display: inline-block;
          font-weight: bold;
          margin-right: 20px;
          font-size: 17px;

          &:last-child{
            margin-right: 0;
          }

          a{
            color: #000;
            text-decoration: none;

            &:hover{
              color: #ffcc00;
            }
          }
        }
      }
    }
  }
</style>