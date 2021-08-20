const state = {
	alterValue:[]
}

const getters = {
	
}

const mutations = {
	setAlertValue( state, value ){
		if( value.type == 'push' ){
			if( !state.alterValue[value.configIndex] ){
				state.alterValue[value.configIndex] = [];
			}
			state.alterValue[value.configIndex].push(value.record);
		}
		if( value.type == 'clear' ){
			state.alterValue[value.configIndex] = [];
		}
	}
}

const actions = {
	
}

export default { state, getters, mutations, actions }