<template>
    <div>
        <menu-title title="Editar">
            <div class="div-form">
                <div class="mdl-grid form-cad">
                    <div class="mdl-cell mdl-cell--6-col">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="nome" v-model="cli.nome" ref="nome">
                            <label v-bind:class="[{'label-edit': cli.nome != undefined},{'mdl-textfield__label': cli.nome == undefined}]" for="nome">Nome</label>
                        </div>
                    </div>
                    <div class="mdl-cell mdl-cell--6-col">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="telefone" v-model="cli.telefone" ref="telefone">
                            <label v-bind:class="[{'label-edit': cli.telefone != undefined},{'mdl-textfield__label': cli.telefone == undefined}]" for="telefone">Telefone</label>
                        </div>
                    </div>
                    <div class="mdl-cell mdl-cell--6-col">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="email" v-model="cli.email" ref="email">
                            <label v-bind:class="[{'label-edit': cli.email != undefined},{'mdl-textfield__label': cli.email == undefined}]" for="email">E-mail</label>
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
                                <input class="mdl-textfield__input" type="text" id="endereco" v-model="cli.endereco" ref="endereco">
                                <label v-bind:class="[{'label-edit': cli.endereco != undefined},{'mdl-textfield__label': cli.endereco == undefined}]" for="endereco">Endereço</label>
                            </div>
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="numero" v-model="cli.numero" ref="numero">
                                <label v-bind:class="[{'label-edit': cli.numero != undefined},{'mdl-textfield__label': cli.numero == undefined}]" for="numero">Número</label>
                            </div>
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="complemento" v-model="cli.complemento" ref="complemento">
                                <label v-bind:class="[{'label-edit': cli.complemento != undefined},{'mdl-textfield__label': cli.complemento == undefined}]" for="complemento">Complemento</label>
                            </div>
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="bairro" v-model="cli.bairro" ref="bairro">
                                <label v-bind:class="[{'label-edit': cli.bairro != undefined},{'mdl-textfield__label': cli.bairro == undefined}]" for="bairro">Bairro</label>
                            </div>
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="estado" v-model="cli.estado" ref="estado">
                                <label v-bind:class="[{'label-edit': cli.estado != undefined},{'mdl-textfield__label': cli.estado == undefined}]" for="estado">Estado</label>
                            </div>
                        </div>
                        <div class="mdl-cell mdl-cell--6-col">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="cidade" v-model="cli.cidade" ref="cidade">
                                <label v-bind:class="[{'label-edit': cli.cidade != undefined},{'mdl-textfield__label': cli.cidade == undefined}]" for="cidade">Cidade</label>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="div-btns-cad">
                        <div>
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored btn-editar" @click="editar">
                                Editar
                            </button>
                        </div>
                        <div>
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent btn-cancel" @click="clear">
                                Cancelar
                            </button>
                        </div>
                </div>
                
                <div class="cont-alert-edit" id="c-a-e" v-show="isAlert"></div>
                
                <div class="div-alert-edit" v-show="isAlert">
                    <div class="div-title-alert" v-show="editAlert">Nenhuma alteração realizada</div>
                    <div class="div-title-alert" v-show="!editAlert">Edição realizada com sucesso!</div>
                </div>
            </div>
        </menu-title>
    </div>
</template>

<script>
import Title from '@/components/Title'

export default {

  name: 'Editar',

  data () {
    return {
        cli:{},
        condName:  true,
        isAlert: false,
        editAlert: false,
        isLoading: false
    };
  },
  components:{
    'menu-title': Title
  },
  methods:{
    editar: function(){
            var options = {emulateJSON: true};
            this.isLoading = true;
            this.cli.app = 'vue';
            this.cli.param = 'editar';
            
            this.$http.post('http://www.projetomobile.esy.es/conexao/servidorapp.php', this.cli, options).then(function(response){
                var aux = response.body;
                var cond = aux.split('-');

                if (cond[0] == '0' && cond[1] == '0') {
                    this.isLoading = false;
                    this.isAlert = true;
                    this.editAlert = true;
                    setTimeout(()=>{
                        this.isAlert = false;
                        this.editAlert = false;
                    }, 2000)
                }

                if(cond[0] == "1" || cond[1] == 1){
                    this.isLoading = false;
                    this.isAlert = true;
                    this.editAlert = false;
                    setTimeout(()=>{
                        this.isAlert = false;
                        this.editAlert = false;
                        this.$router.push('/cliente');
                    }, 2000)
                    
                }
          
        }, function(error){
            console.log(error);
        })
        
    },

    clear: function(){
        this.$router.push('/cliente');
    }
  },
  
  mounted(){
    this.cli = (this.$router.history.current.params.cliente == undefined || 
                    this.$router.history.current.params.cliente == null) ? 'objeto vazio': JSON.parse(this.$router.history.current.params.cliente);
    componentHandler.upgradeDom();

    /**
     * Aplicando efeito no alert
     */
    document.getElementById("c-a-e").style.width = window.screen.width + "px";
    document.getElementById("c-a-e").style.height = window.screen.height + "px";
  }
};
</script>

<style lang="css" scoped>
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
    margin-bottom: 13px;
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
.label-edit{
    color: #3f51b5;
    font-size: 12px;
    position: absolute;
    top: 4px;
    left: 0;
}
.ocultar{
    display: none;
}
.cont-alert-edit{
        width: 1920px;
    height: 1080px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.1;
    background-color: #565353;
}
.div-alert-edit {
   position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-pack: distribute;
    width: 347px;
    height: 70px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #ffffff;
    font-size: 22px;
    background-color: #3f51b5;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    margin-top: -398px;
    border: 1px solid #ccc;
    border-radius: 3px;
    -webkit-box-shadow: -1px 1px 13px 8px rgba(204,204,204,1);
    box-shadow: -1px 1px 13px 8px rgba(204,204,204,1);
    
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
