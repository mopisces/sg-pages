<template>
	<div>
		<van-notice-bar color="#1989fa" background="#ecf9ff" mode="link" @click="noticeClick(0)" wrapable>
			<div class="van-row van-row--flex van-row--justify-center"  style="text-align:left">
				<div class="van-col van-col--12">
					{{ $t('h.time') }}:{{ config.notice.timeTypeText }}
				</div>
				<div class="van-col van-col--12">
					{{ $t('h.line') }}:{{ config.notice.lineTypeText }}
				</div>
			</div>
			<div class="van-row van-row--flex van-row--justify-center"  style="text-align:left">
				<div class="van-col van-col--12">
					{{ $t('h.workShift') }}:{{ config.notice.classTypeText }}
				</div>
				<div class="van-col van-col--12">
					{{ $t('h.chartProperties') }}:{{ config.notice.chartPropertiesText }}
				</div>
			</div>
		</van-notice-bar>
		<van-popup v-model="popupShow" position="right" :style="{ height: '100%', width:'100%' }" :close-on-click-overlay="false">
			<div class="van-nav-bar van-nav-bar--fixed van-hairline--bottom">
				<div class="van-nav-bar__title van-ellipsis">
					{{ $t('h.filterCondition') }}
				</div>
			</div>
			<div style="margin-top:46px;"></div>
			<div role="separator" class="van-divider van-divider--hairline van-divider--content-center" style="border-color: rgb(25, 137, 250); color: rgb(25, 137, 250); padding: 0px 16px;">
  			{{ $t('h.time') }}
			</div>
			<div class="van-row van-row--flex van-row--justify-center"  style="text-align:center">
				<div class="van-col van-col--6" v-for="(item,index) in timeType" :key="index">
					<van-button v-bind:color="item.value == config.select.timeType ? '#de1a1e' :'' " type="primary" size="small" @click="timeTypeClick(item)">{{ item.text }}</van-button>
				</div>
			</div>
			<div role="separator" class="van-divider van-divider--hairline van-divider--content-center" style="border-color: rgb(25, 137, 250); color: rgb(25, 137, 250); padding: 0px 16px;">
  			{{ $t('h.line') }}
			</div>
			<div class="van-row van-row--flex van-row--justify-center"  style="text-align:center">
				<div class="van-col van-col--6" v-for="(item,index) in lineType" :key="index">
					<van-button v-bind:color="item.value == config.select.lineType ? '#de1a1e' :'' " type="primary" size="small" @click="lineTypeClick(item)" :disabled="!item.isnew" >{{ item.text }}</van-button>
				</div>
			</div>
			<div role="separator" class="van-divider van-divider--hairline van-divider--content-center" style="border-color: rgb(25, 137, 250); color: rgb(25, 137, 250); padding: 0px 16px;">
  			{{ $t('h.workShift') }}
			</div>
			<div class="van-row van-row--flex van-row--justify-center"  style="text-align:center">
				<div class="van-col van-col--6" v-for="(item,index) in classType" :key="index">
					<van-button v-bind:color="item.value == config.select.classType ? '#de1a1e' :'' " type="primary" size="small" @click="classTypeClick(item)">{{ item.text }}</van-button>
				</div>
			</div>
			<div role="separator" class="van-divider van-divider--hairline van-divider--content-center" style="border-color: rgb(25, 137, 250); color: rgb(25, 137, 250); padding: 0px 16px;">
	  			{{ $t('h.chartProperties') }}
			</div>
			<div class="van-row van-row--flex van-row--justify-center"  style="text-align:center;margin-top:5px;" v-for="(it,id) in Math.ceil(chartProperties.length/3)" :key="id">
				<div class="van-col van-col--6" v-for="(item,index) in chartProperties.slice(id*3,id*3 + 3)" :key="index">
					<van-button  v-bind:color="item.value == config.select.chartProperties ? '#de1a1e' :'' " type="primary" size="small" @click="chartPropertiesClick(item)">{{ item.text }}</van-button>
				</div>
			</div>
			<div style="padding: 0px 16px;margin-top:30px">
				<van-button type="primary" size="large" @click="closeClick()">{{ $t('h.confirm') }}</van-button>
			</div>
		</van-popup>
	</div>
</template>
<script>
	export default {
		props:['show','lineType'],
		data(){
			return {
				popupShow:this.show,
				statisMethod:'list',
				userChartType:[],
				
				config:{
					select:{
						timeType: null,
						lineType: null,
						classType: null,
						chartProperties: null,
					},
					notice:{
						timeTypeText: '',
						lineTypeText: '',
						classTypeText: '',
						chartPropertiesText: ''
					}
				},
				timeType:[],
				classType:[],
				chartProperties:[],
			}
		},
		methods:{
			closeClick( isClose = 1 ){
				if( isClose == 1 ){
					this.popupShow = false;
					this.$emit('selectOption',this.config.select);
				}else{
					this.popupShow = true;
				}
			},
			noticeClick( isClose ){
				this.closeClick( isClose );
			},
			timeTypeClick( item ){
				this.config.select.timeType = item.value;
				this.config.notice.timeTypeText = item.text;
			},
			lineTypeClick( item ){
				this.config.select.lineType = item.value;
			},
			classTypeClick( item ){
				this.config.select.classType = item.value;
				this.config.notice.classTypeText = item.text;
			},
			chartPropertiesClick( item ){
				this.config.select.chartProperties = item.value;
				this.config.notice.chartPropertiesText = item.text;
			},
			getNoticeInit(){
				this.config.select.timeType = this.timeType[0].value
				for (var i = 0; i < this.lineType.length; i++) {
					if(this.lineType[i].isnew == 1) this.config.select.lineType  = this.lineType[i].value
						break
				}
				this.config.select.classType = this.classType[0].value
				this.config.select.chartProperties = this.chartProperties[0].value
			},
			init() {
				this.timeType = [
					{ text: this.$i18n.t('h.day'), value: 1},
					{ text: this.$i18n.t('h.week'), value: 2},
					{ text: this.$i18n.t('h.month'), value: 3},
				]
				this.classType = [
					{ text: this.$i18n.t('h.all'), value: 'ALL'},
					{ text: 'A', value: 'A'},
					{ text: 'B', value: 'B'},
					{ text: 'C', value: 'C'},
					{ text: 'D', value: 'D'},
				]
				this.chartProperties = [
					{ text: this.$i18n.t('h.sumArea'), value: 'sumArea'},
                    { text: this.$i18n.t('h.sumLen'), value: 'sumLen'},
                    { text: this.$i18n.t('h.avgSpeed'), value: 'avgSpeed'},
                    { text: this.$i18n.t('h.sumLoss'), value: 'sumLoss'},
                    { text: this.$i18n.t('h.numOfStops'), value: 'sumStops'}
				]
			}
		},
		mounted(){
			//this.init()
		},
		created(){
			this.init()
		},
		computed:{
			timeTypeChange(){
				return this.config.select.timeType;
			},
			lineTypeChange(){
				return this.config.select.lineType;
			},
			classTypeChange(){
				return this.config.select.classType;
			},
			chartPropertiesChange(){
				return this.config.select.chartProperties;
			}
		},
		watch:{
			show(newV,oldV){
				this.popupShow = newV;
			},
			popupShow(newV,oldV){
				this.$emit("update:show", newV);
			},
			timeTypeChange(newV,oldV){
				if( newV == '' ){
					this.config.notice.timeTypeText = '';
					return ;
				}
				for (var i = this.timeType.length - 1; i >= 0; i--) {
					if(this.timeType[i].value === newV ){
						this.config.notice.timeTypeText = this.timeType[i].text;
						break;
					}
				}
			},
			lineTypeChange(newV,oldV){
				if( newV === '' ){
					this.config.notice.lineTypeText = '';
					return ;
				}
				for (var i = this.lineType.length - 1; i >= 0; i--) {
					if(this.lineType[i].value == newV ){
						this.config.notice.lineTypeText = this.lineType[i].text;
						break;
					}
				}
			},
			classTypeChange(newV,oldV){
				if( newV == '' ){
					this.config.notice.classTypeText = '';
					return ;
				}
				for (var i = this.classType.length - 1; i >= 0; i--) {
					if(this.classType[i].value === newV ){
						this.config.notice.classTypeText = this.classType[i].text;
						break;
					}
				}
			},
			chartPropertiesChange(newV,oldV){
				if( newV == '' ){
					this.config.notice.chartPropertiesText = '';
					return ;
				}
				for (var i = this.chartProperties.length - 1; i >= 0; i--) {
					if(this.chartProperties[i].value === newV ){
						this.config.notice.chartPropertiesText = this.chartProperties[i].text;
						break;
					}
				}
			},
			lineType(newV,oldV){
				this.getNoticeInit()
			}
		}
	}
</script>
