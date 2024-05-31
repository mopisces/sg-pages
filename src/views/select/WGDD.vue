<template>
	<div class="page-color">
		<van-sticky :offset-top="46">
			<van-row>
				<van-col span="12">
					<van-dropdown-menu>
						<van-dropdown-item v-model="selectItem" :options="dropDownOption" />
					</van-dropdown-menu>
				</van-col>
				<van-col span="12">
					<van-button size="large" @click="config.popup.filterShow = true" >{{ $t('h.filter') }}</van-button>
				</van-col>
			</van-row>
		</van-sticky>
		<van-pull-refresh v-model="config.list.pullRefresh.reloading" @refresh="pullOnRefresh">
			<van-list 
				v-model="config.list.pushLoading.loading" 
				:immediate-check="false" 
				:finished="config.list.pushLoading.finished"  
				:finished-text="$t('h.finishedText')" 
				@load="onLoad" 
				:offset="100"
			>
				<card 
					:title="item.order_number" 
					:extra="$t('h.num')+':'+item.sn"
					:subTitle=" root != 2 ? item.company_name:''"
					:is-shadow="true"
					v-for="(item,index) in listInfo" 
					:key="index"
				>
					<div class="card-body-container">
						<div v-show="config.updown" class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.slittersInfo') }}:
								<span v-if="item.tag === '1'" class="blue-color">{{ $t('h.upperKinfe') }}</span>
								<span v-if="item.tag === '-1'" class="red-color">{{ $t('h.lowerKinfe') }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>
								{{ $t('h.paper') }}:
								<span 
									v-if="config.isnew"
									class="green-color"
								>
									{{ item.paper_code }}
								</span>
								<span 
									v-else
									class="green-color"
								>
									{{ item.paper }}
								</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.facerType') }}:
								<span class="green-color">{{ item.flute_type }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.width') }}:
								<span class="green-color">{{ item.width }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.trimmingSquare') }}:
								<span class="green-color">{{ item.trimming }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-67">
							<span>{{ $t('h.sizeInfo') }}:
								<span class="green-color">{{ item.paper_len }}×{{ item.paper_w }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.numOfSlitters') }}:
								<span class="green-color">{{ item.cutting_qty }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.crossSection') }}1:
								<span v-if="config.isnew" class="green-color">{{ item.slitting }}</span>
								<span v-else class="green-color">{{ item.slitting1 }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.numOfOrd') }}:
								<span class="green-color">{{ item.order_qty }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.scoringType') }}:
								<span class="green-color">{{ item.pressing_type }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.prodSlitters') }}:
								<span class="green-color">{{ item.prod_qty }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>{{ $t('h.badProdNum') }}:
								<span class="green-color">{{ item.bad_qty }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.numOfStops') }}:
								<span class="green-color">{{ item.stops }}</span>
								<span class="green-color">{{ item.stop_time }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.completionTime') }}:
								<span class="green-color">{{ item.finish_date }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.scoringData') }}1:
								<span 
									v-if="config.isnew" 
									class="green-color"
								>
									{{ item.slitting_data }}
								</span>
								<span 
									v-else 
									class="green-color"
								>
									{{ item.slitting_data1 }}
								</span>
							</span>
						</div>
					</div>
				</card>
			</van-list>
		</van-pull-refresh>
		<popup-filter :filterShow.sync="config.popup.filterShow" @resetClick="resetClick" @filterClick="filterClick">
			<div slot="filter-field-1">
				<van-field :label="$t('h.num')" v-model="formData.sn" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<van-field :label="$t('h.ordNum')" v-model="formData.orderNumber" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<van-field :label="$t('h.custName')" v-model="formData.companyName" :placeholder="$t('h.accurateQuery')" input-align="center" v-if=" root != 2 "/>
				<van-field :label="$t('h.paper')" v-model="formData.paperCode" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<van-field :label="$t('h.facerType')" v-model="formData.fluteType" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<van-field :label="$t('h.width')" v-model="formData.width" :placeholder="$t('h.accurateQuery')" input-align="center"/>
				<new-time-picker v-if="config.popup.timePicker.isFinishLoad" :dateTime.sync="formData.beginDate" :minDate="pageConfig.minDate" :maxDate="pageConfig.maxDate" :label="$t('h.startDate')"></new-time-picker>
				<new-time-picker v-if="config.popup.timePicker.isFinishLoad" :dateTime.sync="formData.endDate" :minDate="pageConfig.minDate" :maxDate="pageConfig.maxDate" :label="$t('h.endDate')"></new-time-picker>
				<van-switch-cell v-model="config.switch.checked" :title="$t('h.rememberFilertCondi')" />
			</div>
		</popup-filter>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { getUserInfo } from '@/utils'
	import PopupFilter from '@/components/PopupFilter.vue'
	import NewTimePicker from '@/components/NewTimePicker.vue'

	import Card from '@/components/Card.vue'
	export default {
		components:{
			PopupFilter,
			NewTimePicker,

			Card
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
				this.$store.commit('layout/setTitle', this.$i18n.t('h.completeOrd'))
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