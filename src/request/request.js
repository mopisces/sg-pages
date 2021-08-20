import http from './http'
import QS from 'qs'
import store from '@/store'
import { getDomain } from '@/request/getDomain.js'

/**
 * [post 封装后的post请求]
 * @param  {[string]} url    [请求地址]
 * @param  {Object} params [请求参数]
 * @param  {Number} type   [后台类型 0->后台]
 * @return {[promise]}        [请求]
 */
export async function post( url, params = {} )
{
	if( !store.state.domain.sg ) await getDomain()
	let fullUrl = store.state.domain.sg + url
	return new Promise((resolve,reject)=>{
		http.post(fullUrl, QS.stringify(params)).then( (response)=>{
			resolve(response.data)
		} ).catch((error)=>{
			reject(error.data)
		})
	})
}

export async function get( url, params = {}, type = 0 )
{
	if( !store.state.domain.sg ) await getDomain()
	let fullUrl = store.state.domain.sg + url
	return new Promise((resolve,reject)=>{
		http.get(fullUrl,{params:params}).then( (response)=>{
			resolve(response.data)
		} ).catch((error)=>{
			reject(error.data)
		})
	})
}