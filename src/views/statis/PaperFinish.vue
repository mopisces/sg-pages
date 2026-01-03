<!-- 纸板完工 -->
<template>
	<div>
		<!-- 筛选按钮 -->
		<drag-menu 
			v-show="config.dragMenu.show"
			defpositon="rt" 
			:popMenu="false"
			:pattern="{icon: 'filter-o'}"
			:value="$t('h.filter')"
			@fabClick="menuClick"
		></drag-menu>
		<van-sticky :offset-top="46">
			<van-dropdown-menu>
				<van-dropdown-item v-model="selectItem" :options="dropDownOption" @open="config.dragMenu.show=false" @close="config.dragMenu.show=true"/>
				<van-dropdown-item ref="analysis" :disabled="analysisDisabled" :title="$t('h.analysis')" @open="config.dragMenu.show=false" @close="dropDownAnalysisClose">
					<van-cell :title="$t('h.analysisReport')" is-link :value="$t('h.clickOpen')" @click="analysisClick"/>
					<!-- <van-cell title="明细数据" is-link value="点击打开" @click="detailClick"/> -->
				</van-dropdown-item>
			</van-dropdown-menu>
			<van-tabs v-model="formData.dataType" @change="tabChange">
				<van-tab :title="$t('h.className')" :name="4"></van-tab>
				<van-tab :title="$t('h.date')" :name="5"></van-tab>
				<van-tab :title="$t('h.facerType')" :name="6"></van-tab>
				<van-tab :title="$t('h.paper')" :name="7"></van-tab>
				<van-tab :title="$t('h.shiftCode')" :name="9"></van-tab>
			</van-tabs>
		</van-sticky>
		<!-- 表格信息 -->
		<vxe-table 
			:cell-style="cellStyle" 
			:header-cell-style="headerCellStyle" 
			:row-style="rowStyle"
			stripe 
			:height="height" 
			:data="config.table.data" 
		>
			<vxe-table-column :title="sumTypeTitle" field="SUMType" min-width="100" fixed="left"></vxe-table-column>
			<vxe-table-column :title="$t('h.cuttingQty')" field="cutting_qty" min-width="80"></vxe-table-column>
			<vxe-table-column :title="$t('h.cuttingWasteQty')" field="cutting_waste_qty" min-width="80"></vxe-table-column>
			<vxe-table-column :title="$t('h.goodLen')" field="good_len" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.badLen')" field="bad_len" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.prodLen')" field="prod_len" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.totalLen')" field="total_len" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.goodSqm')" field="good_sqm" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.badSqm')" field="bad_sqm" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.prodSqm')" field="prod_sqm" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.trimSqm')" field="trim_sqm" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.totalSqm')" field="total_sqm" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.badRate')+'(%)'" field="bad_rate" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.trimRate')+'(%)'" field="trim_rate" min-width="100"></vxe-table-column>
			<vxe-table-column :title="$t('h.avgSpeed')" field="avg_speed" min-width="80"></vxe-table-column>
			<vxe-table-column :title="$t('h.workTimeStr')" field="work_time_str" min-width="80"></vxe-table-column>
			<vxe-table-column :title="$t('h.stopTimeStr')" field="stop_time_str" min-width="80"></vxe-table-column>
			<vxe-table-column :title="$t('h.stops')" field="stops" min-width="80"></vxe-table-column>
		</vxe-table>
		<!-- 筛选条件 -->
		<popup-filter 
			:filterShow.sync="config.filter.show" 
			@resetClick="reset" 
			@filterClick="filter"
		>
			<div slot="filter-field-1">
				<!--  v-if=" root != 2 " -->
				<van-field :label="$t('h.custName')" v-model="formData.companyName" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<!-- 班别 -->
				<van-field :label="$t('h.className')" v-model="formData.className" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<!-- 门幅 -->
				<van-field :label="$t('h.width')" v-model="formData.width" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<!-- 纸长 -->
				<van-field :label="$t('h.bdL')" v-model="formData.bdL" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<!-- 纸宽 -->
				<van-field :label="$t('h.bdW')" v-model="formData.bdW" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<!-- 楞别 -->
				<van-field :label="$t('h.facerType')" v-model="formData.fluteType" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<!-- 纸质 -->
				<van-field :label="$t('h.paper')" v-model="formData.paperCode" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<!-- 订单来源 -->
				<uni-check-box
					:label="$t('h.orderSource')"
					:localdata="config.checkbox.orderSource"
					:radioData.sync="formData.orderSource" 
					:map="{text: 'text', value: 'value'}"
				></uni-check-box>
				<!-- 日期 -->
				<time-range-picker
					:label="$t('h.rangeDate')"
					:beginDate.sync="formData.beginDate"
					:endDate.sync="formData.endDate"
					:maxDate.sync="formData.maxDate"
					:minDate.sync="formData.minDate"
				></time-range-picker>
				<van-switch-cell v-model="config.switch.checked" :title="$t('h.rememberFilertCondi')" />
			</div>
		</popup-filter>

		<!-- 报表分析 -->
		<van-popup 
			v-model="config.analysis.show" 
			:round="true"
			:style="{ height: '490px', width:'90%' }"
			@closed="popupAnalysisClose"
		>
			<div class="gap-box">
				{{ analysisInfo.timeRange }}
			</div>
			<div class="gap-box">
				{{ $t('h.prodDataAnalysis') }}
			</div>
			<div class="popup-container">
				<!-- 表格信息 -->
				<vxe-table 
					:cell-style="cellStyle" 
					:header-cell-style="headerCellStyle" 
					stripe 
					:show-header="false"
					:height="170" 
					:data="analysisInfo.prodInfo" 
				>
					<vxe-table-column field="col1_read" width="80"></vxe-table-column>
					<vxe-table-column field="col1_value" width="80"></vxe-table-column>
					<vxe-table-column field="col2_read" width="120"></vxe-table-column>
					<vxe-table-column field="col2_value" width="80"></vxe-table-column>
					<vxe-table-column field="col3_read" width="120"></vxe-table-column>
					<vxe-table-column field="col3_value" width="80"></vxe-table-column>
					<vxe-table-column field="col4_read" width="120"></vxe-table-column>
					<vxe-table-column field="col4_value" width="80"></vxe-table-column>
					<vxe-table-column field="col5_read" width="120"></vxe-table-column>
					<vxe-table-column field="col5_value" width="80"></vxe-table-column>
				</vxe-table>
			</div>
			<div class="gap-box">
				{{ $t('h.machineDataAnalysis') }}
			</div>
			<div class="popup-container">
				<vxe-table 
					:cell-style="cellStyle" 
					:header-cell-style="headerCellStyle" 
					stripe 
					:height="220" 
					:data="analysisInfo.machineList" 
				>
					<vxe-table-column :title="$t('h.layer')" field="layer" width="100"></vxe-table-column>
					<vxe-table-column :title="$t('h.totalSqm')" field="total_sqm" width="80"></vxe-table-column>
					<vxe-table-column :title="$t('h.actualSqm')" field="actual_sqm" width="100"></vxe-table-column>
					<vxe-table-column :title="$t('h.wasteSqm')" field="waste_sqm" width="80"></vxe-table-column>
					<vxe-table-column :title="$t('h.totalWT')" field="total_wt" width="100"></vxe-table-column>
					<vxe-table-column :title="$t('h.actualWT')" field="actual_wt" width="80"></vxe-table-column>
					<vxe-table-column :title="$t('h.wasteWT')" field="waste_wt" width="100"></vxe-table-column>
					<vxe-table-column :title="$t('h.wasteRate')" field="waste_rate" width="100"></vxe-table-column>
				</vxe-table>
			</div>
		</van-popup>
	</div>
</template>

<script>
	/*自定义方法*/
	import { getUserInfo, dateTimeFormat } from "@/utils"
	/*辅助函数*/
	import { mapGetters } from "vuex"
	/*自定义日期*/
	import TimeRangePicker from "@/components/TimeRangePicker.vue"
	/*自定义拖动菜单组件*/
	import DragMenu from "@/components/DragMenu.vue"
	/*自定义筛选弹窗*/
	import PopupFilter from "@/components/PopupFilter.vue"
	/*自定义单选组件*/
	import UniCheckBox from "@/components/UniCheckBox.vue"

	export default {
		components: {
			DragMenu,
			PopupFilter,
			TimeRangePicker,
			UniCheckBox
		},
		data() {
			return {
				// 配置
				config: {
					dragMenu: {
						show: true
					},
					filter: {
						show: false
					},
					analysis: {
						show: false
					},
					switch: {
						checked: false
					},
					table: {
						data: [],
					},
					checkbox: {
						orderSource: [
							{ text: "全部", value: 1},
							{ text: "车间加单", value: 2},
							{ text: "ERP", value: 3},
						]
					},
				},
				// 当前用户权限
				root: null,
				// 表单
				formData: {
					// 数据类型
					dataType: 6,
					// 客户名称
					companyName: null,
					// 订单来源
					orderSource: 1,
					// 门幅
					width: null,
					// 楞别
					fluteType: null,
					// 纸质
					paperCode: null,
					// 纸长
					bdL: null,
					// 纸宽
					bdW: null,
					// 班别
					className: null,
					//开始日期
					beginDate: null,
					//结束日期
					endDate: null,
					//最小日期
					minDate: null,
					//最大日期
					maxDate: null,
				},
				// 分析数据信息
				analysisInfo: {
					// 日期
					timeRange: null,
					// 生产信息
					prodInfo: [],
					// 生产机台数据
					machineList: []
				},
			}
		},
		computed: {
			...mapGetters({
				height: "layout/height",
				dropDownOption: "layout/dbItem"
			}),
			selectItem:{
				get () {
					return this.$store.state.layout.dropDownIndex
				},
				set (value) {
					this.$store.commit("layout/setDropDownIndex", value)
					this.queryList()
				}
			},
			sumTypeTitle() {
				switch( this.formData.dataType ) {
					case 4:
						return this.$t('h.className')
						break
					case 5:
						return this.$t('h.date')
						break
					case 6:
						return this.$t('h.facerType')
						break
					case 7:
						return this.$t('h.paper')
						break
					case 9:
						return "班次"
						break
					default:
						return this.$t('h.className')
				}
			},
			tableRowNum() {
				return this.config.table.data.length
			},
			analysisDisabled() {
				return  this.dropDownOption[this.selectItem].isnew ? false : true
			}
		},
		created(){
			this.$store.commit("layout/setTitle", this.$i18n.t("h.paperFinish"))
			this.$store.commit("layout/setActive", "menu")
			this.init()
		},
		mounted() {
			try{
				let userInfo = getUserInfo()
				this.root = userInfo.root
			}catch(err){
				this.root = null
			}
			this.setElementSize()
			window.onresize = () => {
				return (() => {
					this.setElementSize()
				})()
			}
		},
		destroyed(){
			if( this.config.switch.checked ){
				sessionStorage.setItem("sg/paperFinish", JSON.stringify(this.formData))
			}else{
				sessionStorage.removeItem("sg/paperFinish")
			}
		},
		methods: {
			init() {
				if( sessionStorage.getItem("sg/paperFinish") !== null ){
					const storageData = JSON.parse(sessionStorage.getItem("sg/paperFinish"))
					this.formData = storageData
					this.config.switch.checked = true
				} else {
					const today = new Date()
					const minDate = new Date(today)
					minDate.setDate(today.getDate() - 5)
					this.formData.beginDate = dateTimeFormat(today, "yyyy-MM-dd")
					this.formData.endDate = dateTimeFormat(today, "yyyy-MM-dd")
					this.formData.minDate = dateTimeFormat(minDate, "yyyy-MM-dd")
					this.formData.maxDate = dateTimeFormat(today, "yyyy-MM-dd")
				}
				this.queryList()
			},
			setElementSize(){
				this.$store.commit("layout/setHeight", window.screen.height - 180)
			},
			menuClick() {
				this.config.filter.show = true
			},
			headerCellStyle({ column }) {
				return {
					padding: "2px 0"
				}
			},
			cellStyle({ row, rowIndex, column }) {
				return {
					padding: "0",
				}
			},
			rowStyle({ rowIndex} ) {
				if (this.tableRowNum == rowIndex + 1) {
					return {
			        	backgroundColor: '#1e65f1',
			        	color: '#fff'
			        }
				}
			},
			// 头部tab点击切换
			tabChange(name, title) {
				this.queryList()
			},
			// 报表分析下拉框关闭出发
			dropDownAnalysisClose() {
				this.config.dragMenu.show = this.config.analysis.show? false:true
			},
			// 报表分析弹出层关闭
			popupAnalysisClose() {
				this.config.dragMenu.show = true
			},
			// 获取列表
			queryList() {
				this.config.table.data = this.$options.data().config.table.data
				const postData = Object.assign({}, this.formData, { lineNum: this.selectItem })
				this.$request.statis.fetchPaperFinishList(postData).then((res)=> {
					if( res.errorCode == "00000" ) {
						this.config.table.data = res.result
					} else {
						this.$toast.fail(res.msg)
					}
				})
			},
			// 报表分析点击
			analysisClick() {
				this.formData.dataType = this.$options.data().formData.dataType
				this.config.analysis.show = true
				this.$refs.analysis.toggle()
				
				this.analysisInfo = this.$options.data().analysisInfo
				const postData = Object.assign({}, this.formData, { lineNum: this.selectItem })
				this.$request.statis.fetchPaperFinishAnalysisData(postData).then((res)=> {
					if( res.errorCode == "00000" ) {
						this.analysisInfo = res.result
					} else {
						this.config.analysis.show = false
						this.$toast.fail("暂时无法查看数据")
					}
				})
			},
			// 明细数据点击
			/*detailClick() {
				
			},*/
			// 点击重置
			reset() {
				this.init()
			},
			// 点击筛选
			filter() {
				this.queryList()
			}
		},
	}
</script>

<style type="text/css" scoped>
	.vxe-table--render-default .vxe-body--column.col--ellipsis, .vxe-table--render-default.vxe-editable .vxe-body--column, .vxe-table--render-default .vxe-footer--column.col--ellipsis, .vxe-table--render-default .vxe-header--column.col--ellipsis {
		height: 14px !important;
	}


	.popup-container {
		margin: 10px;
	}

	.gap-box {
		font-size: 14px;
		line-height: 14px;
		margin: 5px 10px 5px 10px;
	}
</style>