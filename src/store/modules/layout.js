import common from '@/request/common'

const state = {
	title:'',
	active:'',
	container:{
		height:null,
		width:null
	},
	dropDownIndex:0,
	dbItem:[],
	weight:0 //备料米数是否安重量查看
}

const getters = {
	title: state => state.title,
	active: state => state.active,
	height:state => state.container.height,
	width: state => state.container.width,
	dropDownIndex: state => state.dropDownIndex,
	dbItem: state => state.dbItem,
	weight: state => state.weight
}

const mutations = {
	setTitle(state, title){
		state.title = title
	},
	setActive(state,active){
		state.active = active
	},
	setHeight( state, height ){
		state.container.height = height
	},
	setWidth( state, width ){
		state.container.width = width
	},
	setDropDownIndex(state, index){
		state.dropDownIndex = index
	},
	setDbItem( state, dbItem ){
		state.dbItem = dbItem
	},
	setWeight( state, weight ){
		state.weight = weight
	}
}

const actions = {
	async getSelectConfig({ commit, state }){
		let dbItem = []
		await common.getConfig().then((res)=>{
			res.result.forEach((item,index)=>{
				dbItem.push({text:item.DB_FLAG,value:index,isnew:item.isnew,updown:item.updown,socketUrl:item.socketio.domain})
			})
			commit('setDbItem', dbItem)
			commit('setWeight', res.weight)
		})

	}
}

export default { state, getters, mutations, actions }