import App from './App.vue'
import router from './router'
import store from './store'
import request from './request'

import { i18n } from './i18n/index'

Vue.prototype.$request = request

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
	router,
	store,
	i18n,
	render: function (h) { return h(App) }
}).$mount('#app')
