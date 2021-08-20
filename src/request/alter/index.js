import { post } from '@/request/request'

const alter = {
	getValue( data ){
		let postData = {
			alter_config_index : data.configIndex
		}
		return post( '/alertGetValue', postData )
	},
	changeVal( data ){
		let postData = {
			change_config_index : data.configIndex,
			change_id           : data.id,
			change_value        : data.sliderValue
		}
		return post( '/alertChangeValue', postData )
	},
	getRecord( data ){
		let postData = {
			alter_config_index : data.configIndex
		}
		return post( '/alertGetRecord', postData )
	},
	clearRecord( data ){
		let postData = {
			alter_config_index : data.configIndex
		}
		return post( '/alertClearRecord', postData )
	}
}

export default alter