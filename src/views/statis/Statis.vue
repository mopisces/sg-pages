<template>
	<div>
		<!-- 筛选按钮 -->
		<drag-menu 
			defpositon="rt" 
			:popMenu="false"
			:pattern="{icon: 'filter-o'}"
			:value="$t('h.filter')"
			@fabClick="menuClick"
		></drag-menu>
		<popup-filter 
			:filterShow.sync="config.filter.show" 
			@resetClick="reset" 
			@filterClick="filter"
		>
			<div slot="filter-field-1">
				<uni-check-box
					:label="$t('h.time')"
					:localdata="config.checkbox.timeType"
					:radioData.sync="formData.timeType" 
					:map="{text: 'text', value: 'value'}"
				></uni-check-box>
				<uni-check-box
					:label="$t('h.line')"
					:localdata="lineType"
					:radioData.sync="formData.lineType" 
					:map="{text: 'text', value: 'value'}"
				></uni-check-box>
				<uni-check-box
					:label="$t('h.workShift')"
					:localdata="config.checkbox.classType"
					:radioData.sync="formData.classType" 
					:map="{text: 'text', value: 'value'}"
				></uni-check-box>
				<uni-check-box
					:label="$t('h.chartProperties')"
					:localdata="config.checkbox.chartProperties"
					:radioData.sync="formData.chartProperties" 
					:map="{text: 'text', value: 'value'}"
				></uni-check-box>
				<time-range-picker
					:beginDate.sync="formData.beginDate"
					:endDate.sync="formData.endDate"
					:maxDate.sync="formData.maxDate"
					:minDate.sync="formData.minDate"
				></time-range-picker>
			</div>
		</popup-filter>
		<!-- 图表容器 -->
		<div id="highcharts-container" :style="{width: config.chart.width + 'px',height: config.chart.height + 'px',}"></div>
	</div>
</template>

<script>
	/*自定义单选组件*/
	import UniCheckBox from "@/components/UniCheckBox.vue"
	/*自定义日期*/
	import TimeRangePicker from "@/components/TimeRangePicker.vue"
	/*自定义拖动菜单组件*/
	import DragMenu from "@/components/DragMenu.vue"
	/*自定义筛选弹窗*/
	import PopupFilter from "@/components/PopupFilter.vue"
	// 辅助函数
	import { mapGetters } from "vuex"

	export default {
		components: {
			UniCheckBox,
			DragMenu,
			PopupFilter,
			TimeRangePicker
		},
		data() {
			return {
				// 配置
				config: {
					chart: {
						width: null,
						height: null
					},
					filter: {
						show: false
					},
					checkbox: {
						timeType: [
							{ text: this.$t('h.day'), value: 1},
							{ text: this.$t('h.week'), value: 2},
							{ text: this.$t('h.month'), value: 3},
						],
						classType: [
							{ text: this.$t('h.all'), value: 'ALL'},
							{ text: 'A', value: 'A'},
							{ text: 'B', value: 'B'},
							{ text: 'C', value: 'C'},
							{ text: 'D', value: 'D'},
						],
						chartProperties: [
							{ text: this.$t('h.sumArea'), value: 'sumArea'},
		                    { text: this.$t('h.sumLen'), value: 'sumLen'},
		                    { text: this.$t('h.avgSpeed'), value: 'avgSpeed'},
		                    { text: this.$t('h.sumLoss'), value: 'sumLoss'},
		                    { text: this.$t('h.numOfStops'), value: 'sumStops'}
						],
					}
				},
				// 表单
				formData: {
					// 时间类型
					timeType: 1,
					// 生产线
					lineType: 0,
					// 班组
					classType: "ALL",
					// 图表属性
					chartProperties: "sumArea",
					//开始日期
					beginDate: null,
					//结束日期
					endDate: null,
					//最小日期
					minDate: null,
					//最大日期
					maxDate: null,
				},
			}
		},
		computed: {
			...mapGetters({
				dropDownOption: "layout/dbItem"
			}),
			lineType() {
				const lineType = this.dropDownOption.filter(row=> row.isnew == 1) || []
				if( lineType.length > 0 ) {
					this.formData.lineType = lineType[0].value
				}
				return lineType
			},
		},
		created(){
			this.$store.commit("layout/setTitle", this.$i18n.t("h.productionReport"))
			this.$store.commit("layout/setActive", "menu")
		},
		mounted(){
			this.setElementSize()
			window.onresize = () => {
				return (() => {
					this.setElementSize()
				})()
			}
			//this.getPageConfig()
		},
		methods: {
			// 设置图表容器大小
			setElementSize(){
				this.config.chart.width = window.screen.height.width
				this.config.chart.height = window.screen.height - 96 - 64 - 44
				if( this.config.chart.chart != null ) this.config.chart.chart.reflow()
			},
			//筛选点击
			menuClick() {
				this.config.filter.show = true
			},
			// 获取页面参数
			getPageConfig() {
				this.$request.statis.getStatisConfig().then(res=>{
					if( res.errorCode == '00000' ) {
						this.formData.maxDate = res.result.date.maxDate
						this.formData.minDate = res.result.date.minDate
						this.formData.beginDate = res.result.date.beginDate
						this.formData.endDate = res.result.date.endDate
					}
				})
			},
			reset() {},
			filter() {}
		},
	}
</script>

<style></style>