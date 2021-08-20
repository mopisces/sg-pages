import { get, post } from '@/request/request'

const common = {
	getConfig(){
		return get( '/selectConfig' )
	}
}

export default common