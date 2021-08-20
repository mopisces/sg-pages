<template>
	<div>
		<van-sticky :offset-top="46">
			<statis-filter-header :show.sync="config.popup.chartSelect.show" :lineType="lineType" @selectOption="selectOption">
			</statis-filter-header>
			<div class="van-row">
				<div class="van-col van-col--12">
					<van-button plain hairline type="info" style="width:100%" @click="onRefresh()">刷新</van-button>
				</div>
				<div class="van-col van-col--12">
					<van-button plain hairline type="info" style="width:100%"  @click="config.popup.filterShow = true">筛选</van-button>
				</div>
			</div>
		</van-sticky>
		<popup-filter :filterShow.sync="config.popup.filterShow" @resetClick="resetClick" @filterClick="filterClick">
			<div slot="filter-field-1">
				<new-time-picker v-if="config.popup.timePicker.isFinishLoad" :dateTime.sync="filterForm.beginDate" :minDate="pageConfig.minDate" :maxDate="pageConfig.maxDate" label="开始日期"></new-time-picker>
				<new-time-picker v-if="config.popup.timePicker.isFinishLoad" :dateTime.sync="filterForm.endDate" :minDate="pageConfig.minDate" :maxDate="pageConfig.maxDate" label="结束日期"></new-time-picker>
			</div>
		</popup-filter>
		<div id="highcharts-container" :style="{width:config.chart.width + 'px',height:config.chart.height + 'px',}">
		</div>
	</div>
</template>
<script>
	import StatisFilterHeader from '@/components/StatisFilterHeader.vue'
	import PopupFilter from '@/components/PopupFilter.vue'
	import NewTimePicker from '@/components/NewTimePicker.vue'
	export default {
		components:{
			StatisFilterHeader,
			PopupFilter,
			NewTimePicker
		},
		data(){
			return {
				config:{
					chart:{
						options:{
							chart:{
								type : 'column',
								panning: true,
								pinchType: 'x',
								zoomType:'x',
								resetZoomButton: {
									position: {
										y: -1000
									}
								}
							},
							title: {
					            text:null
					        },
					        xAxis: {
					            categories: [],
					        },
					        yAxis:{
								min : 0,
								title : {
									text : null
								},
								stackLabels: {
									enabled: false,
									overflow:'none',
									verticalAlign:'middle',
									textAlign:'center',
									rotation:270,
									color:'#39ed0c'
								},
							},
					        tooltip: {
								followTouchMove: false,
								formatter: function () {
						            var str = '';
						            this.points.map(function(item,idx){
						            	if( idx == 0 ){
						            		str += '<b>' + item.x + '</b><br/>';
						            		str += '<b>合计:</b>' + item.total + '<br/>';
						            	}
						            	str += '<b>' + item.series.name + ':' + item.y + '</b><br/>';
						            });
						            return str
						        },
						        shared: true
							},
					        plotOptions: {
					        	column: {
					        		stacking: 'normal',
					        		dataLabels: {
					        			enabled: false,
					        			
					        		}
					        	},
					        },
					        series:[]
						},
						chart:null, //图表实例
						show:false,
						width:null,
						height:null
					},
					popup:{
						chartSelect:{
							show:false,
						},
						filterShow:false,
						timePicker:{
							isFinishLoad:false
						},
					},
				},
				lineType:[],
				pageConfig:{
					maxDate : null,
					minDate : null,
				},
				filterForm:{
					beginDate       : null,
					endDate         : null,
					timeType        : 1,
					lineType        : null,
					classType       : 'ALL',
					chartProperties : 'sumArea',
				}
			}
		},
		methods:{
			selectOption(val){
				this.filterForm.timeType = val.timeType;
				this.filterForm.lineType = val.lineType;
				this.filterForm.classType = val.classType;
				this.filterForm.chartProperties = val.chartProperties;
				this.getStatisData();
			},
			getPageConfig(){
				let self = this;
				this.$request.statis.getStatisConfig().then(res=>{
					if( res.errorCode == '00000' ){
						let select = []
						res.result.line.forEach((item,idx)=>{
							self.lineType.push({value:item.value, text:item.text, isnew:item.isnew})
							if( item.isnew == 1 ){
								select.push(idx)
							}
						});

						self.pageConfig.maxDate = res.result.date.maxDate
						self.pageConfig.minDate = res.result.date.minDate
						self.filterForm.beginDate = res.result.date.beginDate
						self.filterForm.endDate = res.result.date.endDate
						if( select.length > 0 ){
							self.filterForm.lineType = self.lineType[Math.min.apply(null,select)].value
						}
						
					}
				}).then(()=>{
					this.$nextTick(()=>{
						this.config.popup.timePicker.isFinishLoad = true;
					});
				}).then(()=>{
					this.getStatisData();
				});
			},
			getStatisData(){
				console.log(this.filterForm.lineType)
				if( this.filterForm.lineType == null ){
					this.$toast.fail('暂无生产线支持该功能')
					return false
				}
				this.config.chart.show = false;
				let self = this;
				this.$request.statis.getStatisData( this.filterForm ).then(res=>{
					if( res.errorCode == '00000' ){
						self.config.chart.options.xAxis.categories = [];
						this.getSeriesData(res.result);
					}
				}).then(()=>{
					this.config.chart.options.chartProperties = this.filterForm.chartProperties;
					this.config.chart.show = true;
				});
			},
			getReBuildDate( date ){
				switch( this.filterForm.timeType ){
					case 2:
						return '第' + date + '周';
						break;
					case 3:
						return date + '月';
						break;
					default:
						return date;
				}
			},
			getSeriesData( res ){
				let title = ''
				let series = []
				let categories = []

				let trim_sqm = []  //修边平方     [(良品长度+坏品长度)*修边]
				let shift_cutting_waste_sqm = [] //换单切废平方 [0.8米*换单切废数*门幅]  
				let cutting_waste_sqm = []  // 切废平方 [0.8米*切废数*门幅]
				let bad_sqm = [] //坏品平方     [坏品长度*(门幅-修边)]
				let good_sqm = []//良品平方 [良品长度*(门幅-修边)]
				let total_waste_sqm = []  //总废品面积
				let total_len = [] //总长度 [生产长度+切废长度(切废+换单切废)] 
				let avg_speed = [] //平均车速
				let stops = []  //停次
				switch( this.filterForm.chartProperties ){
					case 'sumArea':
						res.forEach((item,idx)=>{
							good_sqm.push(Number(item.good_sqm))
							total_waste_sqm.push(Number(item.total_waste_sqm))
							/*this.config.chart.options.xAxis.categories.push(this.getReBuildDate(item.statis_date))*/
							categories.push(this.getReBuildDate(item.statis_date))
						});
						series.push({name:'良品平方',data:good_sqm})
						series.push({name:'总废品平方',data:total_waste_sqm})
						title = '单位:平方米'
						break;
					case 'sumLen':
						res.forEach((item,idx)=>{
							total_len.push(Number(item.total_len));
							categories.push(this.getReBuildDate(item.statis_date))
						})
						series.push({name:'总米数',data:total_len})
						title = '单位:米'
						break;
					case 'avgSpeed':
						res.forEach((item,idx)=>{
							avg_speed.push(Number(item.avg_speed))
							categories.push(this.getReBuildDate(item.statis_date))
						});
						series.push({name:'平均车速',data:avg_speed})
						title = '平均车速'
						break;
					case 'sumLoss':
						res.forEach((item,idx)=>{
							bad_sqm.push(Number(item.bad_sqm))
							trim_sqm.push(Number(item.trim_sqm))
							shift_cutting_waste_sqm.push(Number(item.shift_cutting_waste_sqm))
							cutting_waste_sqm.push(Number(item.cutting_waste_sqm))
							good_sqm.push(Number(item.good_sqm))
							categories.push(this.getReBuildDate(item.statis_date))
						});
						series.push({name:'坏品平方',data:bad_sqm})
						series.push({name:'修边平方',data:trim_sqm})
						series.push({name:'切废平方',data:cutting_waste_sqm})
						series.push({name:'换单切废平方',data:shift_cutting_waste_sqm})
						title = '平均车速'
						break;
					case 'sumStops':
						res.forEach((item,idx)=>{
							stops.push(Number(item.stops))
							categories.push(this.getReBuildDate(item.statis_date))
						});
						series.push({name:'停次',data:stops})
						title = '单位:次'
					default :
						title = '单位:平方米'
				}

				let extremes = 5
				if( res.length < 5 ) extremes = res.length
				this.config.chart.options.title.text = title
				this.config.chart.options.series = series
				this.config.chart.options.xAxis.categories = categories
				this.initChart(extremes)
			},
			resetClick(){

			},
			filterClick(){
				this.getStatisData();
			},
			onRefresh(){
				this.getStatisData();
			},
			initChart( extremes ){
				this.config.chart.chart = new Highcharts.chart('highcharts-container', this.config.chart.options ,function(c){
					c.xAxis[0].setExtremes(0, extremes)
				})
			},
			setElementSize(){
				this.config.chart.width = window.screen.height.width
				this.config.chart.height = window.screen.height - 96 - 64 - 44
				if( this.config.chart.chart != null ) this.config.chart.chart.reflow()
			}
		},
		created(){
			this.$store.commit('layout/setTitle','生产进度')
			this.$store.commit('layout/setActive','menu')
		},
		mounted(){
			this.getPageConfig()
			this.setElementSize()
			window.onresize = () => {
				return (() => {
					this.setElementSize()
				})()
			}
		},
		updated(){
			
		},
		destroyed(){
			
		},
		computed:{
			
		},
		watch:{

		}
	}
</script>