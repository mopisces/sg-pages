import store from '@/store'
import router from '@/router'
import { getToken, cleanUserInfo } from '@/utils'
import { i18n } from '@/i18n/index'

let http = axios.create({
	timeout:5000,
	headers:{
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		/*'Authentication': getToken()*/
	}
})

let loading = null

http.interceptors.request.use((config)=>{
	loading = vant.Toast.loading({
		duration: 1000, 
	    forbidClick: true,
	    message: i18n.t('h.loading'),
	    overlay:true
	})
	if( getToken() ){
		config.headers.Authentication = getToken()
	}
	return config
},(err)=>{
	return Promise.reject(err)
})

http.interceptors.response.use((response)=>{
	loading.clear()
	errorHandle.serveHandler(response)
	return response
},(err)=>{
	loading.clear()
	errorHandle.httpHandler(err)
	return Promise.reject(err)
})

let errorHandle = {
	httpHandler:( err )=>{
		const { status } = err.response ? err.response : { status : '' }
		if( err && err.response ) {
			switch (status){
				case 400:
					err.message = i18n.t('h.request') + i18n.t('h.error')+'(400)'
					break;
				case 401:
					err.message = ''
					break;
				case 403:
					err.message = i18n.t('h.accessDeined')+'(403)'
					break;
				case 404:
					err.message = i18n.t('h.request')+i18n.t('h.error')+'(404)'
					break;
				case 405:
					err.message = i18n.t('h.request')+i18n.t('h.allow')+'(405)'
					break;
				case 408:
					err.message = i18n.t('h.request')+i18n.t('h.timeout')+'(408)'
					break;
				case 500:
					err.message = i18n.t('h.server')+i18n.t('h.error')+'(500)'
					break;
				case 501:
					err.message = i18n.t('h.server')+i18n.t('h.unUseable')+'(501)'
					break;
				case 502:
					err.message = i18n.t('h.network')+i18n.t('h.error')+'(502)'
					break;
				case 503:
					err.message = i18n.t('h.server')+i18n.t('h.unUseable')+'(503)'
					break;
				case 504:
					err.message = i18n.t('h.network')+i18n.t('h.timeout')+'(504)'
					break;
				case 505:
					err.message = 'http' + i18n.t('h.version')+i18n.t('h.unsupport')+'(505)'
					break;
				default:
					err.message = i18n.t('h.connection')+i18n.t('h.error')+err.response.status
			}
		} else {
			err.message = i18n.t('h.server')+i18n.t('h.connection')+i18n.t('h.fail')
		}
		vant.Notify({
			type: 'warning', 
			message: err.message
		})
	},
	serveHandler:( response )=>{
		if( response.status !== 200 ) {
			vant.Notify({
				type: 'danger', 
				message: i18n.t('h.server')+i18n.t('h.response')+i18n.t('h.error')+response.status
			})
		}else if ( response.data.errorCode !== '00000' ){
			switch ( response.data.errorCode ){
				case '20215':
					vant.Notify({
						type: 'warning', 
						message: i18n.t('h.login')+i18n.t('h.timeout')
					})
					cleanUserInfo()
					break;
				default:
					vant.Notify({
						type: 'danger', 
						message: response.data.msg
					})
			}
		}else{
			vant.Notify({
				type: 'success', 
				message: i18n.t('h.request') + ' '+i18n.t('h.success')
			})
		}
	}
}

export default http