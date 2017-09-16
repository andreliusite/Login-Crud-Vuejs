<template>
	<div>
		<!-- Always shows a header, even in smaller screens. -->
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<header class="mdl-layout__header">
				<div class="mdl-layout__header-row">
					<!-- Title -->
					<span class="mdl-layout-title">{{title}}</span>
					<!-- Add spacer, to align navigation to the right -->
					<div class="mdl-layout-spacer"></div>
					<!-- Navigation. We hide it in small screens. -->
					<nav class="mdl-navigation mdl-layout--large-screen-only">
						<router-link to="/cliente" class="link-menu mdl-navigation__link">Clientes</router-link>
						<router-link to="/cadastro" class="link-menu mdl-navigation__link">Cadastro</router-link>
						<a href="#" @click.prevent="logout" class="mdl-navigation__link">Sair</a>
					</nav>
				</div>
			</header>

			<div class="mdl-layout__drawer">
			<span class="mdl-layout-title">{{title}}</span>
				<nav class="mdl-navigation">
						<router-link to="/cliente" class="link-menu mdl-navigation__link">Clientes</router-link>
						<router-link to="/cadastro" class="link-menu mdl-navigation__link">Cadastro</router-link>
						<a href="#" @click.prevent="logout" class="mdl-navigation__link">Sair</a>
				</nav>
			</div>
			
			<main class="mdl-layout__content">
				<div class="page-content">
				<!-- Your content goes here -->
					<slot>Content to slot</slot>		
				</div>
			</main>
		</div>
	</div>

</template>

<script>
export default {

  name: 'Title',

  data () {
    return {

    };
  },
  methods:{
  	logout: function(){
  		this.$auth.destroyToken();
  		localStorage.removeItem('cliente');
  		this.$router.push('/');
  	}
  },
  props:[
  	'title'
  ]
};
</script>

<style scoped>
.link-menu{
	color:#fff;
	text-decoration: none;
}
</style>