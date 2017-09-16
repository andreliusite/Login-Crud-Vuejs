export default function (Vue){
	
	Vue.auth = {

		setToken(token){
			localStorage.setItem('access_token', token);
		},

		getToken(){
			var token = localStorage.getItem('access_token')
			if (!token) {
				return null
			}else{
				return token
			}
		},
		
		destroyToken(){
			localStorage.removeItem('access_token');
		},

		isAuthenticated(){
			if (this.getToken()) {
				return true;
			}else{
				return false;
			}
		}
	}


	// Usado para registrar a variável $auth no sistema root
	Object.defineProperties(Vue.prototype, {
		$auth:{
			get: () =>{
				return Vue.auth
			}
		}
	})
}