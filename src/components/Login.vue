<template>
  <div class="div-cont" id="div-cont">
    <div class="mdl-grid">
      <div class="mdl-layout-sapcer"></div>
        <form @submit.prevent="login">
          <div class="mdl-card mdl-shadow--2dp my-login-card-size">
            <div class="mdl-card__title mdl-color--primary">
              <h2 class="mdl-card__title-text mdl-color-text--white">{{title}}</h2>
            </div>
            
            <div class="mdl-card__supporting-text">
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <label for="email" class="mdl-textfield__label">Email</label>
                <input name="email" id="email" class="mdl-textfield__input" type="email" ref="textEmail" @input="checkEmailValidator">
                <span class="mdl-textfield__error">Insira um e-mail válido</span>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <label for="password" class="mdl-textfield__label">Senha</label>
                <input name="hidden"  id="password" class="mdl-textfield__input" type="password"  ref="textPassword" @input="checkPasswordValidator" pattern=".{4,8}">
                <span class="mdl-textfield__error">Deve conter entre 4 a 8 caracteres</span>
                
              </div>
            </div>
            
            <div class="mdl-card__actions mdl-card--border">
              <button  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" :disabled="disabledBtn">
              <span v-if="isLoading">Aguarde...</span>
              <span v-else>Entrar</span>
              </button>
              <span v-if="errorM" class="mdl-color-text--red-500">Usuário ou senha incorreto</span>
            </div>
          </div>
        </form>
      <div class="mdl-layout-sapcer"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'authentication',
  data () {
    return {
      rememberMe:false,
      isLoading: false,
      errorM: false,
      title: 'Login',
      disabledBtn: true
    }
  },
  methods:{
    login:function(){

      let options = {emulateJSON: true};
      let email = this.$refs.textEmail.value;
      let pass  = this.$refs.textPassword.value;
      let object = {app: 'vue', email: email, password: pass, param: 'login'};
      this.isLoading = true;
      this.errorM = false;

           
      this.$http.post('http://www.projetomobile.esy.es/conexao/servidorapp.php', object, options).then(function(response){
            if (response.body != 'empty') {
              // Setando token para verificar autenticação do usuário
              this.$auth.setToken(response.body.token);
              this.errorM = false;
              this.$router.push('/cliente');
            }else{
              this.isLoading = false;
              this.errorM = true;
            }
              
          }, function (error){
              console.log("Error " + JSON.stringify(error))
      });
    },
    
    checkEmailValidator: function(){
      if (this.$refs.textEmail.checkValidity() && this.$refs.textEmail.value !== '') {
        if (this.$refs.textPassword.checkValidity() && this.$refs.textPassword.value !== '') {
            this.disabledBtn = false;
        }
      }else{
        this.disabledBtn = true;
      }
    },
    
    checkPasswordValidator: function(){
      if (this.$refs.textPassword.checkValidity() && this.$refs.textPassword.value !== '') {
        if (this.$refs.textEmail.checkValidity() && this.$refs.textEmail.value !== '') {
          this.disabledBtn = false;
        }
      }else{
        this.disabledBtn = true;
      }
    },
 
  },

  mounted: function(){
    document.getElementById("div-cont").style.height = window.screen.height + "px";
    componentHandler.upgradeDom();  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .div-cont{
    /*background-color: cyan;*/
    display: flex;
    align-items: center;
    margin-top: -150px;
  }
</style>
