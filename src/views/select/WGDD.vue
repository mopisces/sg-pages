<template>
	<div>
		<van-sticky :offset-top="46">
			<van-row>
				<van-col span="12">
					<van-dropdown-menu>
						<van-dropdown-item v-model="selectItem" :options="dropDownOption" />
					</van-dropdown-menu>
				</van-col>
				<van-col span="12">
					<van-button size="large" @click="config.popup.filterShow = true" >筛选</van-button>
				</van-col>
			</van-row>
		</van-sticky>
		<van-pull-refresh v-model="config.list.pullRefresh.reloading" @refresh="pullOnRefresh">
			<van-list v-model="config.list.pushLoading.loading" :immediate-check="false" :finished="config.list.pushLoading.finished"  finished-text="没有更多了" @load="onLoad" :offset="100">
				<div :class="'card-detail van-clearfix ' + (index % 2 ? 'bg-color-odd':'bg-color-even')" v-for="(item,index) in listInfo" :key="index">
					<div  v-show="config.updown">
						<div class="oblique-sign-up" v-if="item.tag === '1'">上刀</div>
				        <div class="oblique-sign-down" v-if="item.tag === '-1'">下刀</div>
					</div>
					<table class="card-info">	
						<tr>
							<td>
								序号:<span class="text-color">{{ item.sn }}</span>
							</td>
							<td colspan="2">
								订单号:<span class="text-color">{{ item.order_number }}</span>
							</td>
						</tr>
						<tr>
							<td colspan="3" v-if=" root != 2 ">
								客户名称:<span class="text-color">{{ item.company_name }}</span>
							</td>
						</tr>
						<tr>
							<td>
								纸质:
								<span class="text-color" v-if="config.isnew">{{ item.paper_code }}</span>
								<span class="text-color" v-else>{{ item.paper }}</span>
							</td>
							<td>
								坑型:<span class="text-color">{{ item.flute_type }}</span>
							</td>
							<td>
								门幅:<span class="text-color">{{ item.width }}</span>
							</td>
						</tr>
						<tr>
							<td>
								修边:<span class="text-color">{{ item.trimming }}</span>
							</td>
							<td>
								纸宽:<span class="text-color">{{ item.paper_w }}</span>
							</td>
							<td>
								纸长:<span class="text-color">{{ item.paper_len }}</span>
							</td>
						</tr>
						<tr>
							<td>
								切刀数:<span class="text-color">{{ item.cutting_qty }}</span>
							</td>
							<td>
								剖1:
								<span class="text-color" v-if="config.isnew">{{ item.slitting }}</span>
								<span class="text-color" v-else>{{ item.slitting1 }}</span>
							</td>
							<td>
								订单数:<span class="text-color">{{ item.order_qty }}</span>
							</td>
						</tr>
						<tr>
							<td>
								压型:<span class="text-color">{{ item.pressing_type }}</span>
							</td>
							<!-- <td>
								生产刀数:
								<span class="text-color" v-if="config.updown">{{ item.prod_qty }}</span>
								<span class="text-color" v-else>{{ item.good_qty }}</span>
							</td> -->
							<td>
								生产刀数:
								<span class="text-color">{{ item.prod_qty }}</span>
							</td>
							<td>
								坏品数:<span class="text-color">{{ item.bad_qty }}</span>
							</td>
						</tr>
						<tr>
							<td>
								停车次数:<span class="text-color">{{ item.stops }}</span>
							</td>
							<td colspan="2">
								停车时间:<span class="text-color">{{ item.stop_time }}</span>
							</td>
						</tr>
						<tr>
							<td colspan="3">
								完成时间:<span class="text-color">{{ item.finish_date }}</span>
							</td>
						</tr>
						<tr>
							<td colspan="3">
								压线资料1:
								<span class="text-color" v-if="config.isnew">{{ item.slitting_data }}</span>
								<span class="text-color" v-else>{{ item.slitting_data1 }}</span>
							</td>
						</tr>
					</table>
				</div>
			</van-list>
		</van-pull-refresh>
		<popup-filter :filterShow.sync="config.popup.filterShow" @resetClick="resetClick" @filterClick="filterClick">
			<div slot="filter-field-1">
				<van-field label="序号" v-model="formData.sn" placeholder="精确查询" input-align="center"/>
				<van-field label="订单号" v-model="formData.orderNumber" placeholder="精确查询" input-align="center"/>
				<van-field label="客户名称" v-model="formData.companyName" placeholder="精确查询" input-align="center" v-if=" root != 2 "/>
				<van-field label="纸质" v-model="formData.paperCode" placeholder="精确查询" input-align="center"/>
				<van-field label="坑型" v-model="formData.fluteType" placeholder="精确查询" input-align="center"/>
				<van-field label="门幅" v-model="formData.width" placeholder="精确查询" input-align="center"/>
				<new-time-picker v-if="config.popup.timePicker.isFinishLoad" :dateTime.sync="formData.beginDate" :minDate="pageConfig.minDate" :maxDate="pageConfig.maxDate" label="开始日期"></new-time-picker>
				<new-time-picker v-if="config.popup.timePicker.isFinishLoad" :dateTime.sync="formData.endDate" :minDate="pageConfig.minDate" :maxDate="pageConfig.maxDate" label="结束日期"></new-time-picker>
				<van-switch-cell v-model="config.switch.checked" title="记住筛选条件(本次登录有效)" />
			</div>
		</popup-filter>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { getUserInfo } from '@/utils'
	import PopupFilter from '@/components/PopupFilter.vue'
	import NewTimePicker from '@/components/NewTimePicker.vue'
	export default {
		components:{
			PopupFilter,
			NewTimePicker
		},
		data(){
			return {
				config : {
					list:{
						pullRefresh:{
							reloading : false,
						},
						pushLoading:{
							finished : false,
							loading  : false
						}
					},
					dropDownOption:[],
					popup:{
						filterShow : false,
						timePicker:{
							isFinishLoad : false
						}
					},
					updown : false,
					isnew  : false,
					getInitDate : true,
					switch:{
						checked : false
					}
				},
				formData:{
					sn          : '',
					orderNumber : '',
					companyName : '',
					paperCode   : '',
					fluteType   : '',
					width       : '',
					beginDate   : '',
					endDate     : '',
					curPage     : 1
				},
				pageConfig:{
					minDate : '',
					maxDate : ''
				},
				listInfo : [],
				root : ''
			}
		},
		methods:{
			pullOnRefresh(){
				this.listInfo = [];
				this.formData.curPage = 1;
				this.config.list.pullRefresh.reloading = false;
				this.config.list.pushLoading.finished  = false;
				this.config.list.pushLoading.loading   = true;
				this.getWgdd();
			},
			onLoad(){
				this.formData.curPage++;
				this.getWgdd();
			},
			resetClick(){
				this.formData.sn          = '';
				this.formData.orderNumber = '';
				this.formData.companyName = '';
				this.formData.paperCode   = '';
				this.formData.fluteType   = '';
				this.formData.width       = '';
				this.config.getInitDate   = true;
				this.getConfig( true );
			},
			filterClick(){
				this.pullOnRefresh();
			},
			getDropDown(){
				this.config.updown = this.dropDownOption[ this.selectItem ].updown == 0 ? false : true
				this.config.isnew = this.dropDownOption[ this.selectItem ].isnew == 0 ? false : true
			},
			getConfig( isRest = false ){
				let self = this;
				this.$request.select.getWgddConfig().then(res=>{
					if( res.errorCode == '00000' ){
						if( self.config.getInitDate ){
							self.formData.beginDate = res.result.beginDate;
							self.formData.endDate   = res.result.endDate;
						}
						self.pageConfig.minDate = res.result.minDate;
						self.pageConfig.maxDate = res.result.maxDate;
					}
				}).then(()=>{
					this.$nextTick(()=>{
						this.config.popup.timePicker.isFinishLoad = true;
						if( !isRest ){
							this.getWgdd();
						}
					});
				});	
			},
			getWgdd(){
				let self = this;
				let postData = Object.assign({},{activeItem:this.selectItem},this.formData)

				this.$request.select.getWgdd( postData ).then(res=>{
					if( res.errorCode == '00000' ){
						let maxLength = 3
						if( self.config.updown ){
							maxLength = 6
						}
						if( res.result == null || res.result.length < maxLength ){
							self.config.list.pushLoading.finished = true;
						}
						self.config.list.pushLoading.loading = false;
						res.result.forEach((item,index)=>{
							self.listInfo.push(item)
						});
					}else{
						self.config.list.pushLoading.loading   = false;
						self.config.list.pushLoading.finished = true
					}
				});
			},
			init(){
				this.$store.commit('layout/setTitle','完工订单')
				this.$store.commit('layout/setActive','wgdd')
				try{
					let userInfo = getUserInfo()
					this.root = userInfo.root
				}catch(err){
					this.root = null
				}
				if( sessionStorage.getItem('sg/wgdd') !== null ){
					let storageData = JSON.parse(sessionStorage.getItem('sg/wgdd'))
					this.formData = storageData;
					this.config.getInitDate    = false
					this.config.switch.checked = true
				}
			}
		},
		created(){
			this.init()
		},
		mounted(){
			this.getConfig();
			this.getDropDown();
		},
		updated(){
			
		},
		destroyed(){
			if( this.config.switch.checked ){
				sessionStorage.setItem('sg/wgdd',JSON.stringify(this.formData));
			}else{
				sessionStorage.removeItem('sg/wgdd');
			}
		},
		computed:{
			...mapGetters({
				dropDownOption:'layout/dbItem'
			}),
			selectItem:{
				get () {
					return this.$store.state.layout.dropDownIndex
				},
				set (value) {
					this.$store.commit('layout/setDropDownIndex', value)
					this.config.updown = this.dropDownOption[ value ].updown == 0 ? false : true
					this.config.isnew  = this.dropDownOption[ value ].isnew == 0 ? false : true
					this.pullOnRefresh()
				}
			}
		},
		watch:{
			
		}
	}
</script>
<style type="text/css">
	@import '~@/assets/style/card.css'
</style>