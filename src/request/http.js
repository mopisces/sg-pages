import store from '@/store'
import router from '@/router'
import { getToken, cleanUserInfo } from '@/utils'

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
	    message: "加载中...",
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
					err.message = '请求错误(400)'
					break;
				case 401:
					err.message = ''
					break;
				case 403:
					err.message = '拒绝访问(403)'
					break;
				case 404:
					err.message = '请求出错(404)'
					break;
				case 405:
					err.message = '请求为允许(405)'
					break;
				case 408:
					err.message = '请求超时(408)'
					break;
				case 500:
					err.message = '服务器错误(500)'
					break;
				case 501:
					err.message = '服务未实现(501)'
					break;
				case 502:
					err.message = '网络错误(502)'
					break;
				case 503:
					err.message = '服务不可用(503)'
					break;
				case 504:
					err.message = '网络超时(504)'
					break;
				case 505:
					err.message = 'http版本不受持支(505)'
					break;
				default:
					err.message = `链接出错(${err.response.status})`
			}
		} else {
			console.log(err)
			err.message = '链接服务器失败!'
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
				message: `服务器响应错误(${response.status})`
			})
		}else if ( response.data.errorCode !== '00000' ){
			switch ( response.data.errorCode ){
				case '20215':
					vant.Notify({
						type: 'warning', 
						message: `登录过期,请重新登录`
					})
					cleanUserInfo()
					//router.push()
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
				message: '请求成功'
			})
		}
	}
}

export default http