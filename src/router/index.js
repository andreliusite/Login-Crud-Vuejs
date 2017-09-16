import Vue        from 'vue'
import Router     from 'vue-router'
import Login      from '@/components/Login'
import Cliente    from '@/components/Cliente'
import Cadastro   from '@/components/Cadastro'
import Editar     from '@/components/Editar'

Vue.use(Router)

export default new Router({
  mode:'history',	
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
     
    },

    {
    	path: '/cliente',
    	name: 'Cliente',
    	component: Cliente,
    	meta:{
    		requires: true
    	}
    	
    },

    {
    	path: '/cadastro',
    	name: 'Cadastro',
    	component: Cadastro,
    	meta:{
    		requires: true
    	}
    },

    {
    	path: '/editar',
    	name: 'Editar',
    	component: Editar
    }
  ]
})
