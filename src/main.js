import App from './App.vue'
import router from './router'
import store from './store'
import request from './request'

Vue.prototype.$request   = request

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
	router,
	store,
	render: function (h) { return h(App) }
}).$mount('#app')
