const state = {
	title:'',
	active:'',
	container:{
		height:null,
		width:null
	}
}

const getters = {
	title: state => state.title,
	active: state => state.active,
	height:state => state.container.height,
	width: state => state.container.width
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
	}
}

const actions = {

}

export default { state, getters, mutations, actions }