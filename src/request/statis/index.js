import { post } from '@/request/request'

const statis = {
	getStatisConfig(){
		return post( '/statis/getConfig' )
	},
	getStatisData( data ){
		let postData = {
			begin_date  : data.beginDate,
			end_date    : data.endDate,
			class       : data.classType,
			line        : data.lineType,
			time_type   : data.timeType,
			statis_type : data.chartProperties
		}
		return post( '/statis/getStatisData', postData)
	}
}

export default statis