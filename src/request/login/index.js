import axios from 'axios'
import QS from 'qs'
import { getDomain } from '@/request/getDomain'
import store from '@/store'

const login = {
	login:async ( data )=>{
		if( !store.state.domain.sg ) await getDomain()
		let postData = {
			user_name: data.userName,
			user_pass: data.userPass,
			langs: data.langs
		}
		let fullUrl = store.state.domain.sg + '/login'
		return new Promise((resolve,reject)=>{
			axios.post(fullUrl,QS.stringify(postData)).then((response)=>{
				resolve(response.data)
			}).catch((error)=>{
				reject(error.data)
			})
		})
	},
	getFactoryName:async ()=>{
		if( !store.state.domain.sg ) await getDomain()
		let fullUrl = store.state.domain.sg + '/factoryName'
		return new Promise((resolve,reject)=>{
			axios.post(fullUrl,QS.stringify({})).then((response)=>{
				resolve(response.data)
			}).catch((error)=>{
				reject(error.data)
			})
		})
	}
}

export default login