<template>
	<div id="cont-users">
		<menu-title title="Clientes" >
			<div class="div-table">
 			<div id	="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate div-loadin" v-show="isLoading"></div>
				<table class="mdl-data-table mdl-js-data-table  mdl-shadow--2dp div-table-cli" v-show="!isLoading">
					<thead>
						<tr>
						<th class="mdl-data-table__cell--non-numeric">Nome</th>
							<th>Telefone</th>
							<th>Email</th>
							<th>Endereço</th>
							<th>Estado</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					
					<tbody>
						<tr v-for="cli in cliente">
							<td class="mdl-data-table__cell--non-numeric" >{{cli.nome}}</td>
							<td>{{cli.telefone}}</td>
							<td>{{cli.email}}</td>
							<td>{{cli.endereco}}</td>
							<td>{{cli.estado}}</td>
							<td>
								<button class="mdl-button mdl-js-button mdl-button--primary" v-on:click="edit(cli)">
									Editar
								</button>
							</td>
							<td>
								<button class="mdl-button mdl-js-button mdl-button--accent" v-on:click="beforeDel(cli.id)">
									Deletar
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="div-alert-del" v-show="isAlert">
				<div class="div-title-alert">Deseja apagar esse cliente?</div>
				<div class="div-btn-alert-del">
					<div>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" @click="deletarCliente()">
							Sim
						</button>
					</div>
					<div>
						<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-on:click="cancelDelete">
							Não
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

  name: 'Usuario',

 
  data () {
    return {
    	cliente:{},
    	isLoading: true,
    	isAlert:   false,
    	deleteAux: {},
    	search: ''
    }
  },

  components:{
    	'menu-title': Title
    },
  methods:{

  	clear: function(){
  		this.search = '';
  	},

  	edit: function(cli){
  		this.$router.push({name: 'Editar', params:{cliente: JSON.stringify(cli)}});	

  	},

  	beforeDel: function(id){
  		this.deleteAux = id;
  		this.isAlert = true;
  	},

  	cancelDelete: function(){
  		this.isAlert = false;
  	},

   	deletarCliente:function(){
  		var options = {emulateJSON: true}
  		var object = {param: 'del', app:'vue', id:this.deleteAux}
  		
  		this.$http.post('http://www.projetomobile.esy.es/conexao/servidorapp.php', object, options).then(function(response){
  			if (response.body == 'del-ok') {
  				this.isAlert = false;
  				this.listAll();
  			}
  		
  		}, function(error){
  			console.log("Error 	" + error);
  		})

  	},

  	listAll:function(){
  		var options = {emulateJSON: true}
  		var object = {param: 'list', app:'vue'}
  		this.$http.post('http://www.projetomobile.esy.es/conexao/servidorapp.php', object, options).then(function(response){
  				this.isLoading = false;
  				this.cliente =  response.body;
  			}, function(error){
  			console.log("Error " + error);
  		})
  	}
  },  

  mounted(){
  	// Utilizado para forçar a leitura e aplicação do javascript MDL após o acionamento do vue-router
  	this.isLoading = true;
  	this.listAll();
  	componentHandler.upgradeDom();
  	
  },
  
  componentDidUpdate: function() {
  	this.$refs.search.getDOMNode().MaterialTextfield.checkDirty();
  },

  computed:{
  	filterClient: function(data){
  		return this.cliente.filter((el)=>{
  			return el.nome.match(this.search);
  		});
  	}
  }
};
</script>

<style  scoped>
.div-table{
    margin-top: 50px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
}
table{
	width: 100%;
}
.mdl-data-table th,.mdl-data-table td {
    text-align: center !important;
}
.mdl-data-table__cell--non-numeric.mdl-data-table__cell--non-numeric {
    text-align: center;
}
.btn-table{
	width: 30px;
	height: 30px;
	min-width: 30px;
}
.btn-table i{
	font-size:20px;
}
.div-loadin{
	position: absolute;
	margin-left: auto;
	margin-right: auto;
	left: 0;
	right: 0;
}
.div-alert-del{
	width: 374px;
    height: 120px;
    background-color: #fff;
    position: absolute;
    margin-top: -245px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    border: 1px solid #ccc;
	background-color: #fff4f6;
}
.div-btn-alert-del{
	    position: absolute;
    bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}
.div-title-alert{
	color: #E57373;
    text-align: center;
    padding-top: 20px;
    font-size: 21px;
}
</style>