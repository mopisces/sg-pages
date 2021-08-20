import { get, post } from '@/request/request'

const select = {
	getBl( data ){
		let postData = {
			bl_config_index : data.selectItem
		};
		return post( '/selectGetBl', postData )
	},
	getBlms( data ){
		let postData = {
			blms_active_type  : data.active,
			blms_config_index : data.index
		}
		return post( '/selectBlms', postData )
	},
	getScdd( data ){
		let postData = {
			scdd_sn           : data.sn,
			scdd_order_number : data.orderNumber,
			scdd_company_name : data.companyName,
			scdd_paper_code   : data.paperCode,
			scdd_flute_type   : data.fluteType,
			scdd_width        : data.width,
			scdd_config_index : data.activeItem,
			cur_page          : data.curPage
		}
		return post( '/selectGetScdd', postData );
	},
	getWgddConfig(){
		return get( '/selectGetWgddConfig' )
	},
	getWgdd( data ){
		let postData = {
			wgdd_sn           : data.sn,
			wgdd_order_number : data.orderNumber,
			wgdd_company_name : data.companyName,
			wgdd_paper_code   : data.paperCode,
			wgdd_flute_type   : data.fluteType,
			wgdd_width        : data.width,
			wgdd_begin_time   : data.beginDate,
			wgdd_end_time     : data.endDate,
			wgdd_config_index : data.activeItem,
			cur_page          : data.curPage,
		}
		return post( '/selectGetWgdd', postData )
	}
}

export default select