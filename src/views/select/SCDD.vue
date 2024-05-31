<template>
	<div class="page-color">
		<van-sticky :offset-top="46">
			<van-dropdown-menu>
				<van-dropdown-item v-model="selectItem" :options="dropDownOption" />
				<van-dropdown-item :title="$t('h.filterCondition')" ref="filter">
					<van-field :label="$t('h.num')" v-model="formData.sn" :placeholder="$t('h.accurateQuery')" input-align="center"/>
					<van-field :label="$t('h.ordNum')" v-model="formData.orderNumber" :placeholder="$t('h.accurateQuery')" input-align="center"/>
					<van-field :label="$t('h.custName')" v-model="formData.companyName" :placeholder="$t('h.accurateQuery')" input-align="center" v-if=" root != 2 "/>
					<van-field :label="$t('h.paper')" v-model="formData.paperCode" :placeholder="$t('h.accurateQuery')"input-align="center"/>
					<van-field :label="$t('h.facerType')" v-model="formData.fluteType" :placeholder="$t('h.accurateQuery')" input-align="center"/>
					<van-field :label="$t('h.width')" v-model="formData.width" :placeholder="$t('h.accurateQuery')" input-align="center"/>
					<div style="padding: 5px 16px;">
						<van-row gutter="20" type="flex" justify="center">
							<van-col span="10">
								<van-button type="danger" block round @click="resetClick">{{ $t('reset') }}</van-button>
							</van-col>
							<van-col span="10">
								<van-button type="primary" block round @click="filterClick">{{ $t('filter') }}</van-button>
							</van-col>
						</van-row>
					</div>
				</van-dropdown-item>
			</van-dropdown-menu>
		</van-sticky>
		<van-pull-refresh 
			v-model="config.list.pullRefresh.reloading" 
			@refresh="pullOnRefresh"
		>
			<van-list 
				v-model="config.list.pushLoading.loading"  
				:immediate-check="false" 
				:finished="config.list.pushLoading.finished"  
				:finished-text="$t('h.finishedText')" 
				:offset="100" 
				@load="onLoad"
			>
				<card 
					:title="item.order_number" 
					:extra="$t('h.num')+':'+item.sn"
					:subTitle=" root != 2 ? item.company_name:''"
					:is-shadow="true"
					v-for="(item,index) in listInfo" 
					:key="index"
					@click="cardClick(item)"
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
								{{ $t('h.quantity') }}:
								<span class="green-color">{{ item.quantity }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>
								{{ $t('h.width') }}:
								<span class="green-color">{{ item.width }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>
								{{ $t('h.facerType') }}:
								<span class="green-color">{{ item.flute_type }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.sizeInfo') }}:
								<span class="green-color">{{ item.paper_len }}×{{ item.paper_w }}</span>
								<span 
									v-if=" config.isnew " 
									class="green-color"
								>
									{{ item.paper_code }}
								</span>
								<span v-else class="green-color">{{ item.paper }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>
								{{ $t('h.numOfSlitters') }}:
								<span class="green-color">{{ item.cutting_qty }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>
								{{ $t('h.totalLen') }}:
								<span class="green-color">{{ item.total_len }}{{ $t('h.meter') }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>
								{{ $t('h.crossSection') }}1:
								<span v-if="config.isnew" class="gren-color">{{ item.slitting }}</span>
								<span v-else class="green-color" v-else>{{ item.slitting1 }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-33">
							<span>
								{{ $t('h.bundleQty') }}:
								<span 
									v-if="config.isnew" 
									class="green-color"
								>
									{{ item.bundling_qty }}
								</span>
								<span v-else class="green-color" v-else>{{ item.bundle_qty }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-67">
							<span>
								{{ $t('h.scoringType') }}:
								<span class="green-color">{{ item.pressing_type }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.scoringData') }}1:
								<span 
									v-if=" config.isnew " 
									class="green-color"
								>
									{{ item.slitting_data }}
								</span>
								<span v-else class="green-color">{{ item.slitting_data1 }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.expCompletion') }}:
								<span class="green-color">{{ item.pre_finishtime }}</span>
							</span>
						</div>
						<div class="card-body-item card-body-item-100">
							<span>
								{{ $t('h.remark') }}:
								<span class="green-color">{{ item.remark }}</span>
							</span>
						</div>
					</div>
				</card>
			</van-list>
		</van-pull-refresh>
		<van-dialog 
			v-model="config.dialog.show" 
			:title="config.dialog.title" 
			:message="config.dialog.message" 
			:confirmButtonText="$t('h.confirm')"
			:show-cancel-button="false"
		>
		</van-dialog>
	</div>
</template>
<script>
	import { getUserInfo } from '@/utils'
	import { mapGetters } from 'vuex'

	import Card from '@/components/Card.vue'
	export default {
		components: {
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
						},
					},
					dropDownOption:[],
					updown : false,
					isnew  : false,
					dialog:{
						show:false,
						message:'',
						title:'',
					}
				},
				formData:{
					sn          : '',
					orderNumber : '',
					companyName : '',
					paperCode   : '',
					fluteType   : '',
					width       : '',
					curPage     : 1
				},
				listInfo : [],
				root:null,
				width:window.innerWidth
			}
		},
		methods:{
			pullOnRefresh(){
				this.listInfo = []
				this.formData.curPage = 1
				this.config.list.pullRefresh.reloading = false
				this.config.list.pushLoading.finished  = false
				this.config.list.pushLoading.loading   = true;
				this.getScdd()
			},
			onLoad(){
				this.formData.curPage++
				this.getScdd()
			},
			resetClick(){
				this.formData = this.$options.data().formData
			},
			filterClick(){
				this.$refs.filter.toggle()
				this.pullOnRefresh()
			},
			getScdd(){
				let postData = Object.assign({},{activeItem:this.selectItem},this.formData)

				this.$request.select.getScdd( postData ).then(res=>{
					if( res.errorCode == '00000' ){
						let maxLength = 3
						if( this.config.updown ){
							maxLength = 6
						}
						if( res.result == null || res.result.length < maxLength ){
							this.config.list.pushLoading.finished = true
						}
						this.config.list.pushLoading.loading = false
						res.result.forEach((item,index)=>{
							this.listInfo.push(item)
						})
						
					}
				})
			},
			getDropDown(){
				this.config.updown = this.dropDownOption[ this.selectItem ].updown == 0 ? false : true
				this.config.isnew = this.dropDownOption[ this.selectItem ].isnew == 0 ? false : true
				this.getScdd()
			},
			init(){
				this.$store.commit('layout/setTitle', this.$i18n.t('h.prodOrd'))
				this.$store.commit('layout/setActive','scdd')
				try{
					let userInfo = getUserInfo()
					this.root = userInfo.root
					console.log(this.root)
				}catch(err){
					this.root = null
				}
			},
			cardClick(item){
				this.config.dialog.title =  this.$i18n.t('h.ordNum') + ':' + item.order_number
				this.config.dialog.message = this.$i18n.t('h.remark') + ':' + item.remark;
				this.config.dialog.show = true;
			}
		},
		created(){
			this.init()
		},
		mounted(){
			this.getDropDown()
		},
		updated(){
			
		},
		destroyed(){
			
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
		watch:{}
	}
</script>
<style type="text/css">
	@import '~@/assets/style/card.css';
</style>