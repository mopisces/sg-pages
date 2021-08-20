import { post } from '@/request/request'

const user = {
	getList(){
		return post( '/userList' )
	},
	doEdit(data){
		let postData = {
			id      : data.id,
			is_edit : data.edit,
			user    : data.user,
			pass    : data.pass,
		}
		return post( '/userDoEdit', postData )
	},
	doStatus(data){
		return post( '/userDoStatus', data )
	}
}

export default user