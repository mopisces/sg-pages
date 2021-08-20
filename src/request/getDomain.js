import store from '@/store'

export async function getDomain(){
	await axios.get('/domain.json').then((response)=>{
		if(response.data.sg) store.commit('domain/setSg',response.data.sg)
	}).catch((err)=>{
		store.commit('domain/setSg',null)
	})
}