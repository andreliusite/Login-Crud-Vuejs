<template>
	<div>
		<menu-title title="Cadastro de Cliente">
			<div class="div-form">
				<div class="mdl-grid form-cad">
					<div class="mdl-cell mdl-cell--6-col">
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
							<input class="mdl-textfield__input" type="text" id="nome" v-model="cli.nome" ref="nome" pattern=".{10,50}" @keyup="validation">
							<label class="mdl-textfield__label" for="nome">Nome *</label>
							<span class="mdl-textfield__error">Entre 10 e 50 caracteres</span>
						</div>
					</div>
					<div class="mdl-cell mdl-cell--6-col">
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
							<input class="mdl-textfield__input" type="text" id="telefone" v-model="cli.telefone" ref="telefone">
							<label class="mdl-textfield__label mdl-textfield--floating-label " for="telefone">Telefone</label>
						</div>
					</div>
					<div class="mdl-cell mdl-cell--6-col">
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
							<input class="mdl-textfield__input" type="email" id="email" v-model="cli.email" ref="email" @keyup="validation">
							<label class="mdl-textfield__label" for="email">Email</label>
							<span class="mdl-textfield__error">Insira um e-mail válido</span>
						</div>
					</div>
					<div class="mdl-cell mdl-cell--6-col">
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
							<label class="mdl-textfield__label" for=""></label>
						</div>
					</div>
				</div>

				<!-- Loading -->
				<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate div-loading" v-show="isLoading"></div>
				<!-- Loading -->

				<div class="div-end">
					<div class="mdl-grid form-cad">
						<div class="mdl-cell mdl-cell--6-col">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input class="mdl-textfield__input" type="text" id="endereco" v-model="cli.endereco" ref="endereco" @keyup="validation">
								<label class="mdl-textfield__label" for="endereco">Endereço *</label>
							</div>
						</div>
						<div class="mdl-cell mdl-cell--6-col">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input class="mdl-textfield__input" type="text" id="numero" v-model="cli.numero" ref="numero" @keyup="validation">
								<label class="mdl-textfield__label" for="numero">Número *</label>
							</div>
						</div>
						<div class="mdl-cell mdl-cell--6-col">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input class="mdl-textfield__input" type="text" id="complemento" v-model="cli.complemento" ref="complemento">
								<label class="mdl-textfield__label" for="complemento">Complemento</label>
							</div>
						</div>
						<div class="mdl-cell mdl-cell--6-col">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input class="mdl-textfield__input" type="text" id="bairro" v-model="cli.bairro" ref="bairro" @keyup="validation">
								<label class="mdl-textfield__label" for="bairro">Bairro *</label>
							</div>
						</div>
						<div class="mdl-cell mdl-cell--6-col">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input class="mdl-textfield__input" type="text" id="estado" v-model="cli.estado" ref="estado" @keyup="validation">
								<label class="mdl-textfield__label" for="estado">Estado *</label>
							</div>
						</div>
						<div class="mdl-cell mdl-cell--6-col">
							<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								<input class="mdl-textfield__input" type="text" id="cidade" v-model="cli.cidade" ref="cidade" @keyup="validation">
								<label class="mdl-textfield__label" for="cidade">Cidade *</label>
							</div>
						</div>

					</div>
				</div>

				<div class="div-btns-cad">
					<div>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" @click="cadCli" :disabled="disableBtn">
							Cadastrar
						</button>
					</div>
					<div>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="clear">
							Limpar Campos
						</button>
					</div>
				</div>
			</div>
		</menu-title>
	</div>
</template>

<script>
import Title from '@/components/Title'

export default {

  name: 'Cadastro',

  data () {
    return {
    	cli: {},
    	isLoading: false,
    	disableBtn: true
    	
    };
  },
  
  components:{
  	'menu-title': Title
  },

  mounted(){
  	/**
  	 * Força a leitura do javascript do Material Design Lite para o funcionamento dos inputs e labels float
  	 */
  	componentHandler.upgradeDom();
  },

  methods:{
  	cadCli: function(){
  		var options = {emulateJSON: true};
  		this.isLoading = true;
  		
  		this.cli.nome        = this.$refs.nome.value;
  		this.cli.telefone    = this.$refs.telefone.value;
  		this.cli.email       = this.$refs.email.value;
  		this.cli.endereco    = this.$refs.endereco.value;
  		this.cli.numero      = this.$refs.numero.value;
  		this.cli.complemento = this.$refs.complemento.value;
  		this.cli.bairro      = this.$refs.bairro.value;
  		this.cli.cidade      = this.$refs.cidade.value;
  		this.cli.estado      = this.$refs.estado.value;
  		this.cli.app 		 = 'vue';	
  		this.cli.param 		 = 'insert';	

  		this.$http.post('http://www.projetomobile.esy.es/conexao/servidorapp.php', this.cli, options).then(function(response){
  			if (response.body == 'cad-ok') {
  				this.isLoading = false;
  				this.$router.push('/cliente');	
  			}
  			
  		}, function(error){
  			console.log("Error " + error);
  		})
  		
  	},

  	clear:function(){
  		this.cli = {};
  		this.$router.push('/cadastro');
  	},

  	validation: function(){
  		if (this.$refs.nome.checkValidity() && this.$refs.nome.value.length >= 10 &&
  			this.$refs.email.checkValidity() && 
  			this.$refs.email.value !== '' && 
  			this.$refs.endereco.value !== '' && 
  			this.$refs.numero.value !== '' && 
  			this.$refs.bairro.value !== '' && 
  			this.$refs.estado.value !== '' && 
  			this.$refs.cidade.value !== '' ) {
  				this.disableBtn = false;
  		}else{
  				this.disableBtn = true;
  			}
  		}
	}
 
};
</script>

<style >
.div-title{
	color: #fff;
    height: 68px;
    width: 100%;
    background-color: #3f51b5 !important;
    font-size: 28px !important;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    cursor: pointer;
}
.form-cad {
	border:1px solid #ccc;
	text-align: center;

}
.div-tit{
	position: absolute;
	margin-left: auto;
	margin-right: auto;
	left:0;
	right: 0;
}
.div-tit div {
	float: left;
}
.mdl-button--fab .material-icons {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-12px,-12px);
    transform: translate(-12px,-12px);
    line-height: 24px;
    width: 24px;
    margin-top: 6px;
    font-size: 35px;
    margin-left: -2px;
}
.div-form{
	width: 70%;
	margin: 40px auto 0;
}
.mdl-grid.form-cad {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.div-end{
	text-align: center;
	color:#ccc;
	margin-top: 30px;
}
.div-end h3{
	font-size: 28px;
	color: #888181;
}
.mdl-button--fab.mdl-button--colored {
    background: #3f51b5;
    color: #fff;
}
.mdl-button--fab.mdl-button--colored:hover {
	background: #3f51b5;
}
.mdl-layout__container {
	top:0;
}
.div-btns-cad{
	    display: flex;
    width: 55%;
    padding: 5px;
    margin-top: 20px;
    justify-content: space-evenly;
    margin-left: auto;
    margin-right: auto;
}
.mdl-textfield__input{
	color:#6d6565;
}
.div-loading{
     position: relative;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: -20px;
}
</style>